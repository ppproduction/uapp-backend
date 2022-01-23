import { Connection, Repository } from "typeorm";
import GenericInterface from "../../../models/interfaces/GenericInterface";

class GenericPostgres<T> implements GenericInterface<T> {
    protected repository : Repository<T>;
    private entity : string;
    constructor(connection : Connection, entity : string) {
        this.entity = entity;
        this.repository = connection.getRepository(entity);
    }

    readEntity = async (id: string): Promise<T> => {
        const entity = await this.repository.findOne(id);
        if(entity) return entity;
        const err = { message: `${this.entity} not found for id: ${id}`, statusCode: 404 };
        throw err;
    }

    createEntity = async (entity: T): Promise<T> => {
        const _entity = await this.repository.save(entity);
        return _entity;
    }

    deleteEntity = async (id: string): Promise<{ success: true; }> => {
        const resp = await this.repository.delete(id);
        if (resp.affected && resp.affected > 0) return { success: true };
        const err = { message: `${this.entity} not found for id: ${id}`, statusCode: 404 };
        throw err;
    }

    updateEntity = async (id: string, entity: T): Promise<{ success: true; }> => {
        const _entity = await this.repository.findOne(id);
        if (_entity) {
            this.repository.save(entity);
            return { success: true };
        }
        const err = { message: `${this.entity} not found for id: ${id}`, statusCode: 404 };
        throw err;
    }
}

export default GenericPostgres;
import GenericInterface from "../../models/interfaces/GenericInterface";

class GenericService<T> implements GenericInterface<T> {
    private repository : GenericInterface<T>;
    constructor(repository : GenericInterface<T>) {
        this.repository = repository;
    }

    deleteEntity(id: string): Promise<{ success: boolean; }> {
        return this.repository.deleteEntity(id);
    }

    updateEntity(id: string, entity: T): Promise<{ success: boolean; }> {
        return this.repository.updateEntity(id, entity);
    }

    readEntity(id: string): Promise<T> {
        return this.repository.readEntity(id);
    }

    createEntity(entity: T): Promise<T> {
        return this.repository.createEntity(entity);
    }
}

export default GenericService;
import { Repository } from "typeorm";

interface GenericInterface<T> {
    readEntity(id : string) : Promise<T>;
    createEntity(entity : T) : Promise<T>;
    deleteEntity(id : string) : Promise<{success : boolean}>;
    updateEntity(id : string, entity : T) : Promise<{success : boolean}>;
}

export default GenericInterface;
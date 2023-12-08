import { Schema, schema } from "normalizr";
import { BaseSchema } from "./base.schema";

export class UserSchema extends BaseSchema {
    constructor() {
        super('users', 'userId');
    }

    public getOneSchema(): Schema {
        this.initSchema(
            this.getEntityName, 
            {}, 
            { idAttribute: this.getIdAttribute }
        );
        return this.getSchema;
    }

    public getWithPropertiesSchema(propertiesSchema: schema.Array): Schema {
        this.initSchema(
            this.getEntityName, 
            { Properties: propertiesSchema }, 
            { idAttribute: this.getIdAttribute }
        );
        return this.getSchema;
    }
}
import { Schema, schema } from "normalizr";
import { BaseSchema } from "./base.schema";

export class PropertySchema extends BaseSchema {
    constructor() {
        super('properties', 'propertyId');
    }

    public getArraySchema(): schema.Array {
        this.initSchema(this.getEntityName, {}, { idAttribute: this.getIdAttribute });
        return new schema.Array(this.getSchema);
    }

    public getWithUserSchema(userSchema: Schema): Schema {
        this.initSchema(
            this.getEntityName, 
            { User: userSchema }, 
            { idAttribute: this.getIdAttribute }
        );
        return this.getSchema;
    }
}
import { Schema, schema } from "normalizr";

export class BaseSchema {
    constructor(
        private _entityName: string | symbol = '', 
        private _idAttribute: string | schema.SchemaFunction  = '',
        private _schema: Schema = {},
    ) {}

    protected initSchema(key: string | symbol, definition?: Schema, options?: schema.EntityOptions) {
        this._entityName = key;
        this._schema = new schema.Entity(key, definition, options);
    }

    get getSchema(): Schema {
        return this._schema;
    }

    get getEntityName(): string | symbol {
        return this._entityName;
    }

    get getIdAttribute(): string | schema.SchemaFunction {
        return this._idAttribute;
    }
}
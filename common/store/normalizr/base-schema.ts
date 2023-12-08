import { Schema, schema } from "normalizr";

export class BaseSchema {
    constructor(
        private _entityName: string | symbol = '', 
        private _schema: Schema = {}
    ) {}

    protected initSchema(key: string | symbol, definition?: Schema, options?: schema.EntityOptions) {
        this._entityName = key;
        this._schema = new schema.Entity(key, definition, options);
    }
}
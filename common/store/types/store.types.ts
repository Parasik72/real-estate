export interface StoreEntity<T extends Object> {
    [key: string]: T;
}
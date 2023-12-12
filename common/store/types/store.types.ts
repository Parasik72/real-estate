export interface Entity<T extends Object> {
    [key: string]: T;
}

export interface StoreEntity<T extends Object> {
    byId: Entity<T>;
    allIds: string[];
}
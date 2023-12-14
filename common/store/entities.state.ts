import { Entity } from "./types/store.types";

type State = Entity<Entity<Object>>;

export class EntitiesState {
    constructor(private state: State = {}) {}

    // public remove(key: string) {
    //     const { [key]: removed, ...newState } = this.state;
    //     return newState;
    // }
}
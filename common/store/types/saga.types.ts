export interface SagaEffectAction<T extends Object> {
    payload: T;
    type: string;
}
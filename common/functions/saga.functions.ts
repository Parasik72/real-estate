import { SagaEffectAction } from "../store/types/saga.types";

export function sagaAction(
    type: string,
    payload: Record<string, any> = {},
): SagaEffectAction<Object> {
    return { type, payload};
}
import { Action, Store } from 'redux'
import { withStore } from './withStore'
import { Formula, invoke } from '@barajs/formula'

type Dispatch = (formulaAction: Formula) => Formula
/**
 * Dispatch a Redux action to store to change some state.
 */
export const dispatch = withStore<Dispatch>(
  (formula: Formula) => async (payload: any, store: Store, ...rest: any[]) => {
    const action: Action = await Promise.resolve(formula(payload, ...rest))
    store.dispatch(action)
    return payload
  },
)

type DispatchInvoke = (dispatcher: string, formula: Formula) => Formula

export const dispatchInvoke = withStore<DispatchInvoke>(
  (dispatcher: string, formula: Formula) => async (
    payload: any,
    store: Store,
    ...rest: any[]
  ) => {
    return await invoke(dispatcher, formula)(payload, store.dispatch, ...rest)
  },
)

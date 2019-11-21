import { Action, Store } from 'redux'
import { withStore } from './withStore'
import { Formula } from '@barajs/formula'

/**
 * Dispatch a Redux action to store to change some state.
 */
export const dispatch = withStore(
  (formula: Formula) => async (payload: any, store: Store, ...rest: any[]) => {
    const action: Action = await Promise.resolve(formula(payload, ...rest))
    store.dispatch(action)
    return payload
  },
)

import { Store } from 'redux'
import { Formula } from '@barajs/formula'

import { withStore } from './withStore'

export const getState = withStore(
  (formula: Formula) => (_: any, store: Store, ...rest: any[]) => {
    return formula(store.getState(), ...rest)
  },
)

export const getStateBySelector = withStore(
  (paramFormula: Formula, selector: (state: any) => any) => async (
    _: any,
    store: Store,
    ...rest: any[]
  ) => {
    const param = await Promise.resolve(paramFormula(_, ...rest))
    const state = store.getState()
    return selector(param)(state)
  },
)

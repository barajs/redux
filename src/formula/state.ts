import { Store } from 'redux'
import { Formula } from '@barajs/formula'

import { withStore } from './withStore'

export const getState = withStore(
  (formula: Formula) => (_: any, store: Store, ...rest: any[]) => {
    return formula(store.getState(), ...rest)
  },
)

export interface GetStateBySelectorProps {
  param: Formula
  selector: (state: any) => any
}
export const getStateBySelector = withStore(
  (config: GetStateBySelectorProps) => async (
    payload: any,
    store: Store,
    ...rest: any[]
  ) => {
    const { param, selector } = config
    const arg = await Promise.resolve(param(payload, ...rest))
    const state = store.getState()
    return selector(arg)(state)
  },
)

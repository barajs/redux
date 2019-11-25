import { getContext } from '@barajs/core'
import { lensProp } from '@barajs/formula'
import { Store } from 'redux'
import isEqual from 'lodash.isequal'

import { BARA_REDUX } from '../types'

export interface StatePropSelector {
  prop: string
  selector: (state: any) => any
}

export const stateProp = (selectorData: StatePropSelector) => (
  _: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  const initialState = data.initialState
  const lastState = data.lastState

  const { prop, selector } = selectorData
  const current = selector(store.getState())
  const last =
    lastState[prop] === undefined ? selector(initialState) : lastState[prop]

  if (!isEqual(current, last)) {
    lastState[prop] = current
    return true
  }
  return false
}

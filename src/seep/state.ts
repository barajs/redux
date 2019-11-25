import { getContext } from '@barajs/core'
import { lensProp } from '@barajs/formula'
import { Store } from 'redux'
import isEqual from 'lodash.isequal'

import { BARA_REDUX } from '../types'

export interface StatePropSelector {
  prop: string
  selector: (state: any) => any
}

const lastState: any = {}
export const stateProp = (selectorData: StatePropSelector) => (
  _: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  const initialState = data.initialState
  //   const lastState = data.lastState

  const { prop, selector } = selectorData
  const current = selector(store.getState())
  const last =
    lastState[prop] === undefined ? selector(initialState) : lastState[prop]

  const shouldPass = !isEqual(current, last)
  console.log(
    `Should pass: ${shouldPass}`,
    JSON.stringify(last),
    JSON.stringify(current),
  )
  if (shouldPass) {
    lastState[prop] = current
    return true
  }
  return false
}

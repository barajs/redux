import { getContext } from '@barajs/core'
import { lensProp } from '@barajs/formula'
import { Store } from 'redux'
import isEqual from 'lodash.isequal'

import { BARA_REDUX } from '../types'

export const stateProp = (subscribeProp: string, debug?: boolean) => (
  _: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  const initialState = data.initialState
  const lastState = data.lastState
  const currentStateValue = lensProp(subscribeProp)(store.getState())
  const lastStateValue =
    lastState[subscribeProp] === undefined
      ? lensProp(subscribeProp)(initialState)
      : lensProp(subscribeProp)(lastState)
  if (debug) {
    console.log(
      `Last state: ${JSON.stringify(lastStateValue, null, 2)}`,
      `Current state: ${JSON.stringify(currentStateValue, null, 2)}`,
    )
  }
  const shouldPass = !isEqual(currentStateValue, lastStateValue)
  if (shouldPass) {
    lastState[subscribeProp] = currentStateValue
    return true
  }
  return false
}

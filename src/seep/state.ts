import { getContext } from '@barajs/core'
import { lensProp } from '@barajs/formula'
import { Store } from 'redux'
import { BARA_REDUX } from '../types'

let lastState: any = {}
export const stateProp = (subscribeProp: string) => (
  _: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  const initialState = data.initialState
  const currentState = lensProp(subscribeProp)(store.getState())
  const lastStateValue =
    lastState[subscribeProp] === undefined
      ? lensProp(subscribeProp)(initialState)
      : lensProp(subscribeProp)(lastState)
  const shouldPass = currentState !== lastStateValue
  if (shouldPass) {
    lastState[subscribeProp] = currentState
    return true
  }
  return false
}

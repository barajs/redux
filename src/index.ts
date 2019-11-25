import { portion, flow, popEvent, popSeep } from '@barajs/core'
import { createStore } from 'redux'

import { ReduxMold, ReduxContext, BARA_REDUX } from './types'
import * as flows from './flow'

const Redux = portion<any, ReduxContext, ReduxMold>({
  name: BARA_REDUX,
  mold: {},
  init: mold => {
    const { reducers, initialState, store: predefinedStore } = mold
    const store = !predefinedStore
      ? createStore(reducers, initialState)
      : predefinedStore
    const currentState = initialState || store.getState()
    return {
      store,
      initialState: currentState,
      lastState: {},
    }
  },
  whenInitialized: flow<unknown, ReduxContext, ReduxMold>({
    bootstrap: ({ context, next }) => {
      const { store } = context
      next(store.getState())
    },
  }),
  ...flows,
})

const { whenInitialized: whenStoreReady, whenStateChange } = popEvent(Redux)

const { stateProp } = popSeep(whenStateChange)

export { Redux, whenStoreReady, whenStateChange, stateProp }
export * from './types'
export * from './formula'
export default Redux

import { portion, flow, popEvent } from '@barajs/core'
import { createStore } from 'redux'

import { ReduxMold, ReduxContext, BARA_REDUX } from './types'
import * as flows from './flow'

const Redux = portion<any, ReduxContext, ReduxMold>({
  name: BARA_REDUX,
  mold: {},
  init: mold => {
    const { reducers, preloadedState, store: predefinedStore } = mold
    const store = !predefinedStore
      ? createStore(reducers, preloadedState)
      : predefinedStore
    return { store }
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

export { Redux, whenStoreReady, whenStateChange }
export * from './types'
export * from './formula'
export default Redux

import { portion, flow, popEvent } from '@barajs/core'
import { ReduxMold, ReduxContext } from './types'
import { createStore } from 'redux'

import * as flows from './flow'

const Redux = portion<any, ReduxContext, ReduxMold>({
  name: 'bara-redux',
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

export { Redux, whenStoreListening, whenStateChange }
export * from './types'
export * from './formula'
export default Redux

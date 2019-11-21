import { flow } from '@barajs/core'
import { ReduxContext, ReduxMold } from '../types'

export const whenStateChange = flow<any, ReduxContext, ReduxMold>({
  bootstrap: ({ context, next }) => {
    const { store } = context
    store.subscribe(() => {
      next(store.getState())
    })
  },
})

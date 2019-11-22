import { Store } from 'redux'
import { Formula } from '@barajs/formula'

import { withStore } from './withStore'

export const getState = withStore(
  (formula: Formula) => (_: any, store: Store, ...rest: any[]) => {
    return formula(store.getState(), ...rest)
  },
)

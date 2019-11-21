import { getContext } from '@barajs/core'
import { Formula } from '@barajs/formula'
import { Store } from 'redux'

import { BARA_REDUX, ReduxFormula } from '../types'

export const withStore = (formula: Formula | ReduxFormula) => (
  options?: any,
) => (payload: any, contextes: any) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  return formula(options)(payload, store, contextes)
}

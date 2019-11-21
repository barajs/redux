import { getContext } from '@barajs/core'
import { Formula } from '@barajs/formula'
import { Store } from 'redux'

import { BARA_REDUX, ReduxFormula } from '../types'

export const withStore = (formula: Formula | ReduxFormula) => (
  options?: any,
) => async (payload: any, contextes: any) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  const next = await Promise.resolve(
    formula(options)(payload, store, contextes),
  )
  return next
}

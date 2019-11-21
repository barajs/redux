import { getContext } from '@barajs/core'
import { Formula, lensProp } from '@barajs/formula'
import { Store } from 'redux'
import { BARA_REDUX } from '../types'

let lastState: any = {}
export const stateProp = (subscribeProp: string) => (
  _: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_REDUX, contextes)
  const store: Store = data.store
  const currentState = lensProp(subscribeProp)(store.getState())

  const shouldPass = currentState !== lastState[subscribeProp]
  //   console.log(
  //     `subscribeProp: ${subscribeProp}`,
  //     `\ncompare: \n\r Last: ${JSON.stringify(
  //       lastState[subscribeProp],
  //     )} - Current: ${JSON.stringify(currentState)}`,
  //     '\nShould pass: ',
  //     shouldPass,
  //   )
  if (shouldPass) {
    lastState[subscribeProp] = currentState
    return true
  }
  return false
}

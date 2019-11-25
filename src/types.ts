import { Store } from 'redux'

export interface ReduxMold {
  actions: string[]
  asyncActions: string[]
  initialState: any
  reducers: []
  store: Store
}

export interface ReduxContext {
  store: Store
  initialState: any
  lastState: any
}

export const BARA_REDUX = 'bara-redux'

export type ReduxFormula = (
  options?: any,
) => (payload: any, store: Store, contextes: any) => Promise<any>

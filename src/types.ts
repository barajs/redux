import { Store } from 'redux'

export interface ReduxMold {
  actions: string[]
  asyncActions: string[]
  preloadedState: any
  reducers: []
  store: Store
}

export interface ReduxContext {
  store: Store
}

export const BARA_REDUX = 'bara-redux'

export type ReduxFormula = (
  options?: any,
) => (payload: any, store: Store, contextes: any) => Promise<any>

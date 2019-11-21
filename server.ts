import { run, app, act, cond } from '@barajs/core'
import { pipe, report, gather } from '@barajs/formula'
import { createStore, Action } from 'redux'
import Library, {
  whenStoreReady,
  whenStateChange,
  stateProp,
  dispatch,
} from './src'

const initialState = {
  hello: 'world',
  deep: {
    nested: {
      state: 'value',
    },
  },
}

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'GREET':
      return {
        ...state,
        hello: 'greet',
      }
    case 'NESTED':
      return {
        ...state,
        deep: {
          nested: {
            state: 'great',
          },
        },
      }
    default:
      return state
  }
}

const store = createStore(rootReducer)

run(
  app({
    portion: [Library({ store })],
    trigger: [
      whenStoreReady(
        act(
          pipe(
            report('Redux store ready to go {.}'),
            dispatch(
              gather({
                type: 'GREET',
              }),
            ),
            dispatch(
              gather({
                type: 'GREET',
              }),
            ),
            dispatch(
              gather({
                type: 'NESTED',
              }),
            ),
          ),
        ),
      ),
      whenStateChange(
        cond(
          stateProp('deep.nested'),
          act(
            pipe(
              report('Deep nested changed: {.}'),
              // dispatch(gather({ type: 'NESTED' })),
            ),
          ),
        ),
      ),
      whenStateChange(
        cond(
          stateProp('hello'),
          act(
            pipe(
              report('Hello changed: {.}'),
              // dispatch(gather({ type: 'NESTED' })),
            ),
          ),
        ),
      ),
    ],
  }),
)

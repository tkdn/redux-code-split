import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reducerRegistry from './reducerRegistry'

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// --------------------------
// usual reducer
// --------------------------
import rootReducer from './increment'


const initialState = {} /* from local storage or server */

// Preserve initial state for not-yet-loaded reducers
const combine = (reducers) => {
  const reducerNames = Object.keys(reducers)
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state
    }
  })
  return combineReducers(reducers)
}

const reducer = combine(reducerRegistry.getReducers())
// const store = createStore(reducer, initialState)


// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers))
})

// --------------------------
// usual store
// --------------------------
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store

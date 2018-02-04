import reducerRegistry from '../reducerRegistry'

const initialState = { value: 0 }

const reducerName = 'counter'

const createActionName = name => `${reducerName}/${name}`

// actions
const INCREMENT = createActionName('increment')

// reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INCREMENT: {
      return { ...state, value: state.value + 1 }
    }
    default: {
      return state
    }
  }
}

reducerRegistry.register(reducerName, reducer)

// action creators
export const increment = () => ({ type: INCREMENT })

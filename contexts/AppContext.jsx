import { createContext, useReducer } from 'react'

export const ActionType = {
  SET_BOOK_LIST: 'SET_BOOK_LIST',
}
const initialState = {
  state: {
    bookList: [],
  },
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ActionType.SET_BOOK_LIST:
        return {
          bookList: action.bookList,
        }
      // adding some state here
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { StateProvider, store }

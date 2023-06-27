import { createContext, useContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

const UserContext = createContext()

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  }
}

export const useUser = () => {
  const stateAndDispatch = useContext(UserContext)

  return stateAndDispatch[0]
}

export const useUserDispatch = () => {
  const stateAndDispatch = useContext(UserContext)

  return stateAndDispatch[1]
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
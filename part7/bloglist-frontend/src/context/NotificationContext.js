import { createContext, useContext, useReducer } from 'react'

const initialState = { message: null, type: null }

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'REMOVE_NOTIFICATION':
    return { message: null, type: null }
  default:
    return state
  }
}

const NotificationContext = createContext()

export const setNotification = (message, type) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      message,
      type,
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export const useNotification = () => {
  const stateAndDispatch = useContext(NotificationContext)

  return stateAndDispatch[0]
}


export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(NotificationContext)

  return stateAndDispatch[1]
}

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
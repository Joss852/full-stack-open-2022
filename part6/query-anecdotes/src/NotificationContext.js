import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': 
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const setNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default NotificationContext
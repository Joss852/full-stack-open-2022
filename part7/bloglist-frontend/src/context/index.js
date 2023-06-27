import { NotificationContextProvider } from './NotificationContext'

const ContextProvider = ({ children }) => {
  return (
    <NotificationContextProvider>
      {children}
    </NotificationContextProvider>
  )
}

export default ContextProvider
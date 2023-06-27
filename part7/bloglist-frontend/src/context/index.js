import { NotificationContextProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const ContextProvider = ({ children }) => {
  return (
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </NotificationContextProvider>
  )
}

export default ContextProvider
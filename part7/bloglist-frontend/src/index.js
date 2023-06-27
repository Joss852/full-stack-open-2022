import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import { NotificationContextProvider } from './context/NotificationContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NotificationContextProvider>
)

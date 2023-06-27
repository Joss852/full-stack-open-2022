import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import ContextProvider from './context/'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContextProvider>
)

import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'

export default configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
  },
})

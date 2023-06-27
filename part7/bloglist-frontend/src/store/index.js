import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'

export default configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

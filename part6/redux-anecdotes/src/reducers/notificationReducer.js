import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: (state, action) => '',
  },
})

export const { setNotification, clearNotification } =
  notificationReducer.actions

export const setNotificationWithTimeout = (message, timeout) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationReducer.reducer

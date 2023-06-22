import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: (state, action) => (action.payload = initialState),
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, type, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import appServices from '../services/'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    removeUser: (state, action) => null
  }
})

export const { setUser, removeUser } = userSlice.actions

export const login = user => {
  return async dispatch => {
    const loggedUser = await appServices.userService.login(user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
    appServices.setToken(loggedUser.token)
    dispatch(setUser(loggedUser))
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }
}

export default userSlice.reducer
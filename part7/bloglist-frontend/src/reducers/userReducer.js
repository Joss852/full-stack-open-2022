import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'

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
    const loggedUser = await userService.login(user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
    blogService.setToken(user.token)
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
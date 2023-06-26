import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    newBlog: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, newBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = formContent => {
  return async dispatch => {
    const blog = await blogService.create(formContent)

    dispatch(newBlog(blog))
  }
}

export default blogSlice.reducer
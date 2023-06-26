import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    newBlog: (state, action) => {
      state.push(action.payload)
    },
    likeBlog: (state, action) => {
      return state.map((b) =>
        b.id === action.payload.id ? { ...b, likes: action.payload.likes } : b,
      )
        .sort((a, b) => b.likes - a.likes)
    },
    deleteBlog: (state, action) => {
      state.filter(b => b.id !== action.payload)
    }
  }
})

export const { setBlogs, newBlog, likeBlog, deleteBlog } = blogSlice.actions

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

export const like = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })

    dispatch(likeBlog(updatedBlog))
  }
}

export const remove = id => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
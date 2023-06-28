import blog from './blogs'
import user from './users'
import comment from './comments'

export const setToken = (newToken) => {
  blog.setToken(newToken)
  comment.setToken(newToken)
  user.setToken(newToken)
}

export const blogService = blog

export const userService = user

export const commentService = comment

export default { blogService, userService, commentService, setToken }
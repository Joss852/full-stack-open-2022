import blog from './blogs'
import user from './users'

export const setToken = (newToken) => {
  blog.setToken(newToken)
  user.setToken(newToken)
}

export const blogService = blog

export const userService = user

export default { blogService, userService, setToken }
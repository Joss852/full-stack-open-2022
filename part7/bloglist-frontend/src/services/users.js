import axios from 'axios'

const baseUrl = '/api/users'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const login = (credentials) => {
  const request = axios.post('/api/login', credentials)

  return request.then((response) => response.data)
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}



export default { getAll, setToken, login }

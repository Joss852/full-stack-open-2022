import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getComments = id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(`${baseUrl}/${id}/comments`, config)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const update = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, getComments, create, update, remove, setToken }

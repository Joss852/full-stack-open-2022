import axios from 'axios'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getComments = id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(`/api/blogs/${id}/comments`, config)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(
    `/api/blogs/${newObject.id}/comments`,
    newObject,
    config
  )
  return request.then((response) => response.data)
}


export default { getComments, create, setToken }

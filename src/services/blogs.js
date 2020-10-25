import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL || ''}/api/blogs`

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)

  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)

  return response.data
}

const commentBlog = async (blog, content) => {
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { content })

  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)

  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default {
  getAll,
  commentBlog,
  createNew,
  setToken,
  updateBlog,
  deleteBlog
}

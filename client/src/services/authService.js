import axios from 'axios'
const API_URL_AUTH = '/api/v1/auth'

// Register User
const register = async (user) => {
  const response = await axios.post(`${API_URL_AUTH}/register`, user)
  return response.data
}

// Login User
const login = async (user) => {
  const response = await axios.post(`${API_URL_AUTH}/login`, user)
  return response.data
}

export default {
  register,
  login,
}

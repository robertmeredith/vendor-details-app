import axios from 'axios'
const API_URL_USERS = '/api/v1/users'

// useUser Function
const getUser = async (user) => {
  console.log('getUser - user ' , user);
  if (!user) return null
  const response = await axios.get(`/api/v1/users/${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  console.log('getUser ', response);

  return await response.data
}

// Get User Vendors - used for fetching vendors for client form
const getUserVendors = async (userId) => {
  const { data } = await axios.get(`${API_URL_USERS}/${userId}/vendors`)
  return data
}

// Get User Settings - used for populating form with user settings
const getUserSettings = async (userId) => {
  const { data } = await axios.get(`${API_URL_USERS}/${userId}/settings`)
  return data
}

export default {
  getUser,
  getUserVendors,
  getUserSettings,
}

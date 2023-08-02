import axios from 'axios'
const API_URL_SETTINGS = '/api/v1/settings'

// Update User Settings
const updateUserSettings = async ({ settingsData, user }) => {
  const { data } = await axios.post(
    `${API_URL_SETTINGS}/${settingsData._id}`,
    settingsData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return data
}

export default {
  updateUserSettings,
}

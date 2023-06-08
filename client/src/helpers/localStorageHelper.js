const USER_LOCAL_STORAGE_KEY = 'vendor-app-user'

// helper to save user to localstorage
export function setStoredUser(user) {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user))
}

// helper to get user from localstorage
export function getStoredUser() {
  const storedUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  return storedUser ? JSON.parse(storedUser) : undefined
}

export function clearStoredUser() {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
}

export default {
  setStoredUser,
  getStoredUser,
  clearStoredUser,
}

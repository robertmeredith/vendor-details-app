import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  status: '',
}

const notificationSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    },
  },
})

export const { createNotification, clearNotification } =
  notificationSlice.actions

let myTimeout

// Combines set and clear of notification
export const alertSuccess = (message, timeInSeconds) => {
  return async (dispatch) => {
    clearTimeout(myTimeout)
    dispatch(createNotification({ message, status: 'success' }))
    myTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}

export const alertWarning = (message, timeInSeconds) => {
  return async (dispatch) => {
    clearTimeout(myTimeout)
    dispatch(createNotification({ message, status: 'warning' }))
    myTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}

export const alertError = (message, timeInSeconds) => {
  return async (dispatch) => {
    clearTimeout(myTimeout)
    dispatch(createNotification({ message, status: 'danger' }))
    myTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer

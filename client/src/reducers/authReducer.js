import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message = error.response.data.msg
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login User
export const login = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    console.log('INSIDE REGISTER THUNK', user)
  }
)

// ACTIONS - these call the above reducers
export const registerUser = (user) => {
  return async (dispatch) => {
    const data = await authService.register(user)
    console.log('DATA', data)
  }
}

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create Auth Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default authSlice.reducer

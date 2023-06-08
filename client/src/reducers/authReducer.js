import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'
import { alertError } from './alertReducer'
import 'react-toastify/dist/ReactToastify.css'

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      console.log('/authReducer -', error)
      const message = error.response.data.msg
      thunkAPI.dispatch(alertError(message, 3))
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
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isSuccess = false
      state.isError =  false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } =
  authSlice.actions
export default authSlice.reducer

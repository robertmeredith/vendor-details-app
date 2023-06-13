import useUser from './useUser'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { alertWarning } from '../reducers/alertReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  // LOGIN
  const { mutate: loginUser } = useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      if (user) {
        queryClient.setQueryData(['user'], user)
        navigate('/')
        toast.success('Logged in!')
      }
    },
    onError: (error) => {
      dispatch(alertWarning(error.response.data.msg, 5))
    },
    retry: 0,
  })

  // REGISTER
  const { mutate: registerUser } = useMutation({
    mutationFn: authService.register,
    onSuccess: (user) => {
      if (user) {
        queryClient.setQueryData(['user'], user)
        navigate('/')
        toast.success('Registered!')
      }
    },
    onError: (error) => {
      dispatch(alertWarning(error.response.data.msg, 5))
    },
    retry: 0,
  })

  // LOGOUT
  const logout = () => {
    console.log('HIT')
    queryClient.setQueryData(['user'], null)
    toast.success('Logged out!')
  }

  return { loginUser, registerUser, logout }
}

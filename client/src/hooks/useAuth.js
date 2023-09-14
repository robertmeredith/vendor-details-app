import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function useAuth() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // LOGIN
  const { mutate: loginUser } = useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      if (user) {
        queryClient.setQueryData(['user'], user)
        navigate('/submissions')
        toast.success('Logged in!')
      }
    },
    onError: (error) => {
      toast.error(error.response.data.msg, 5)
    },
    retry: 0,
  })

  // REGISTER
  const { mutate: registerUser } = useMutation({
    mutationFn: authService.register,
    onSuccess: (user) => {
      if (user) {
        queryClient.setQueryData(['user'], user)
        navigate('/vendors')
        toast.success('Success! You are now registered!')
      }
    },
    onError: (error) => {
      toast.error(error.response.data.msg, 5)
    },
    retry: 0,
  })

  // LOGOUT
  const logout = useCallback(() => {
    queryClient.setQueryData(['user'], null)
    navigate('/login')
    toast.success('Logged out!')
  }, [queryClient, navigate])

  return { loginUser, registerUser, logout }
}

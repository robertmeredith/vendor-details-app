import localStorageHelper from '../helpers/localStorageHelper'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import userService from '../services/userService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function useUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    initialData: localStorageHelper.getStoredUser,
    onError: () => {
      navigate('/')
      queryClient.setQueryData(['user'], null)
    },
  })

  // useEffect to update local storage when user query cache changes
  useEffect(() => {
    if (!user) {
      localStorageHelper.clearStoredUser()
    } else {
      localStorageHelper.setStoredUser(user)
    }
  }, [user])

  return user ?? null
}

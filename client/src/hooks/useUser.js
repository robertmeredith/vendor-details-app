import axios from 'axios'
import localStorageHelper from '../helpers/localStorageHelper'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// useUser Function
const getUser = async (user) => {
  if (!user) return null
  const response = await axios.get(`/api/v1/users/${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })

  return await response.data
}

export default function useUser() {
  // useUser query
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: localStorageHelper.getStoredUser(),
    onError: () => {
      localStorageHelper.clearStoredUser()
    },
  })

  // useEffect to update local storage when user query cache changes
  useEffect(() => {
    console.log('useEffect running', user)
    if (!user) {
      localStorageHelper.clearStoredUser()
    } else {
      localStorageHelper.setStoredUser(user)
    }
  }, [user])

  return user ?? null
}

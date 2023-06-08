import axios from 'axios'
import localStorageHelper from '../helpers/localStorageHelper'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

async function getUser(user) {
  if (!user) return null
  const response = await axios.get(`/api/v1/users/${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })

  return await response.data
}

export default function useUser() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: localStorageHelper.getStoredUser(),
    onError: () => {
      localStorageHelper.clearStoredUser()
    },
  })

  useEffect(() => {
    if (!user) {
      localStorageHelper.clearStoredUser()
    } else {
      localStorageHelper.setStoredUser(user)
    }
  }, [user])

  return {
    user: user ?? null,
  }
}

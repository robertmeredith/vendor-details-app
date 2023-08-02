import localStorageHelper from '../helpers/localStorageHelper'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/userService'

export default function useUser() {
  // useUser query
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: localStorageHelper.getStoredUser(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    onError: () => {
      localStorageHelper.clearStoredUser()
    },
  })

  // useEffect to update local storage when user query cache changes
  useEffect(() => {
    // TODO: Is this useEffect just running because it's in a lot of rendered components - not because the user is changing
    // console.log('USEUSER - useEffect running', user)
    if (!user) {
      localStorageHelper.clearStoredUser()
    } else {
      localStorageHelper.setStoredUser(user)
    }
  }, [user])

  return user ?? null
}

import { useQuery } from '@tanstack/react-query'
import userService from '../services/userService'
import { toast } from 'react-toastify'

const useGetUserSettings = (userId) => {
  const userSettings = useQuery({
    queryKey: ['settings', userId],
    queryFn: () => userService.getUserSettings(userId),
    onError: (error) => toast.error(error.response.data.msg),
  })

  return userSettings
}

export default useGetUserSettings

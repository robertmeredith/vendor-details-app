import { useQuery } from '@tanstack/react-query'
import userService from '../services/userService'
import { toast } from 'react-toastify'

// Get User vendors - userId obtained from form path
const useGetUserVendors = (userId) => {
  const userVendors = useQuery({
    queryKey: ['vendors', userId],
    queryFn: () => userService.getUserVendors(userId),
    onError: (error) => toast.error(error.response.data.msg),
  })

  return userVendors
}

export default useGetUserVendors
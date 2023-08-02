import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from './useUser'
import vendorService from '../services/vendorService'
import { toast } from 'react-toastify'

const useGetAllVendors = (vendorId) => {
  // get current logged in user
  const user = useUser()
  const queryClient = useQueryClient()

  const fallback = {
    count: 0,
    vendors: [],
  }

  // GET ALL VENDORS
  const {
    data: vendorsData = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getAllVendors(user),
    placeholderData: fallback,
    onSuccess: (data) => console.log('GET ALL VENDORS', data),
  })

  return {
    data: vendorsData,
    isLoading,
    isError,
    error,
  }
}

export default useGetAllVendors

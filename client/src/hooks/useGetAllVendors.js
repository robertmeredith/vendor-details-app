import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from './useUser'
import vendorService from '../services/vendorService'
import useErrorHandling from './useErrorHandling'

const useGetAllVendors = (vendorId) => {
  const user = useUser()

  const { handleError } = useErrorHandling()

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
    onError: (error) => handleError(error),
  })

  return {
    data: vendorsData,
    isLoading,
    isError,
    error,
  }
}

export default useGetAllVendors

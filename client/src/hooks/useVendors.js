import { useQuery } from '@tanstack/react-query'
import useUser from '../hooks/userUser'
import vendorService from '../services/vendorService'

// FETCH VENDOR LIST QUERY
const useVendors = () => {
  // get current logged in user
  const { user } = useUser()

  const {
    data: vendorsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getAllVendors(user),
    initialData: {
      count: 0,
      vendors: [],
    },
  })

  return { vendorsData, isLoading, isError, error }
}

export default useVendors

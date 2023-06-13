import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from '../hooks/useUser'
import vendorService from '../services/vendorService'
import { toast } from 'react-toastify'

// FETCH VENDOR LIST QUERY
const useVendors = () => {
  // get current logged in user
  const user = useUser()
  const queryClient = useQueryClient()

  const fallback = {
    count: 0,
    vendors: [],
  }

  const {
    data: vendorsData = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getAllVendors(user),
    placeholderData: fallback,
  })

  // CREATE VENDOR MUTATION
  const { mutate: createVendor } = useMutation({
    mutationFn: (vendorData) =>
      vendorService.createVendor({ vendorData, user }),
    onSuccess: ({ vendor }) => {
      const { vendors } = queryClient.getQueryData(['vendors'])
      queryClient.setQueryData(['vendors'], {
        count: vendors.length + 1,
        vendors: [...vendors, vendor],
      })
      toast.success(`${vendor.name} successfully added`)
    },
    // TODO: Deal with error handling
    // onError: (error, vendorDetails) => setInitialFormValues(vendorDetails),
  })

  // UPDATE VENDOR MUTATION
  const { mutate: updateVendor } = useMutation({
    mutationFn: vendorService.updateVendor,
    onSuccess: ({ vendor }) => {
      const { vendors } = queryClient.getQueryData(['vendors'])
      queryClient.setQueryData(['vendors'], {
        count: vendors.length,
        vendors: vendors.map((v) => (vendor._id === v._id ? vendor : v)),
      })
    },
    // onError: (error, vendorDetails) => setInitialFormValues(vendorDetails),
  })

  return {
    vendorsData,
    isLoading,
    isError,
    error,
    createVendor,
    updateVendor,
  }
}

export default useVendors

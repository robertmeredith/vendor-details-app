import { useMutation, useQueryClient } from '@tanstack/react-query'
import vendorService from '../services/vendorService'
import { toast } from 'react-toastify'
import useUser from './useUser'
import { useDispatch } from 'react-redux'
import { alertWarning } from '../reducers/alertReducer'
import useErrorHandling from './useErrorHandling'

const useUpdateVendor = () => {
  const queryClient = useQueryClient()
  const user = useUser()
  const dispatch = useDispatch()
  const { handleError } = useErrorHandling()

  // CREATE VENDOR MUTATION
  const updateVendorMutation = useMutation({
    mutationFn: (vendorData) =>
      vendorService.updateVendor({ vendorData, user }),
    onSuccess: (data, vendorData) => {
      queryClient.refetchQueries(['vendors', vendorData._id])
      toast.success('Vendor updated successfully!')
    },
    // TODO: Change this to toast or error handler
    onError: (error) => handleError(error),
  })

  return updateVendorMutation
}

export default useUpdateVendor

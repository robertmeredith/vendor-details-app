import { useMutation, useQueryClient } from '@tanstack/react-query'
import vendorService from '../services/vendorService'
import { toast } from 'react-toastify'
import useUser from './useUser'
import { useDispatch } from 'react-redux'
import { alertWarning } from '../reducers/alertReducer'

const useUpdateVendor = () => {
  const queryClient = useQueryClient()
  const user = useUser()
  const dispatch = useDispatch()

  // CREATE VENDOR MUTATION
  const updateVendorMutation = useMutation({
    mutationFn: (vendorData) =>
      vendorService.updateVendor({ vendorData, user }),
    onSuccess: (data, vendorData) => {
      queryClient.refetchQueries(['vendors', vendorData._id])
      toast.success('Vendor updated successfully!')
    },
    onError: (error) => dispatch(alertWarning(error.response.data.msg, 5)),
  })

  return updateVendorMutation
}

export default useUpdateVendor

import { useMutation } from '@tanstack/react-query'
import vendorService from '../services/vendorService'
import useUser from './useUser'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useDeleteVendor = () => {
  const user = useUser()
  const queryClient = useQueryClient()

  const deleteVendorMutation = useMutation({
    mutationFn: (vendorData) =>
      vendorService.deleteVendor({ vendorData, user }),
    onSuccess: (_, vendor) => {
      console.log('DELETE VENDOR DATA', _);
      toast.success(`Vendor: ${vendor.name} successfully deleted`)
    },
    onError: (error, { name }, context) =>
      toast.error(`There was an error deleting ${name}`),
  })

  return deleteVendorMutation
}

export default useDeleteVendor

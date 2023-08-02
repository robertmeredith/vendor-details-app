import { useMutation, useQueryClient } from '@tanstack/react-query'
import vendorService from '../services/vendorService'
import { toast } from 'react-toastify'
import useUser from './useUser'
import randomstring from 'randomstring'


const useCreateVendor = () => {
  const user = useUser()

  // CREATE VENDOR MUTATION
  const addVendorMutation = useMutation({
    mutationFn: (vendorData) => {
      return vendorService.createVendor({
        vendorData,
        user,
      })
    },
    onSuccess: (data) => {
      toast.success('Vendor created successfully!')
    },
  })

  return addVendorMutation
}

export default useCreateVendor

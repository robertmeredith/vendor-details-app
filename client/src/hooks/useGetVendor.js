import { useQuery } from '@tanstack/react-query'
import vendorService from '../services/vendorService'
import useUser from './useUser'
import { toast } from 'react-toastify'

const useGetVendor = (vendorId) => {
  const user = useUser()

  // GET SINGLE VENDOR
  const singleVendor = useQuery({
    queryKey: ['vendors', vendorId],
    queryFn: () => vendorService.getSingleVendor({ vendorId, user }),
    onError: (error) => toast.error(error.response.data.msg),
    enabled: !!vendorId,
  })

  return singleVendor
}

export default useGetVendor

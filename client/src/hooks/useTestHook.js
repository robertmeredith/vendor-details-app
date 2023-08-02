import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from '../hooks/useUser'
import vendorService from '../services/vendorService'

const useTestHook = (vocalise) => {
  const user = useUser()
  const queryClient = useQueryClient()

  // CREATE VENDOR MUTATION
  const { mutate, error } = useMutation({
    mutationFn: (vendorData) => {
      vendorService.testCreateVendor({ vendorData, user })
    },
    onSuccess: (a, b, c) => {
      console.log('A', a)
      console.log('B', b)
      console.log('C', c)
      queryClient.refetchQueries(['vendors'])
    },
    onError: (error) => {
      console.log('There was an error')
    },
  })

  return { mutate, error }
}

export default useTestHook

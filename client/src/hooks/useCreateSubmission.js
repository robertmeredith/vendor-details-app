import { useMutation } from '@tanstack/react-query'
import submissionService from '../services/submissionService'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useCreateSubmission = () => {
  const queryClient = useQueryClient()

  const createSubmissionMutation = useMutation({
    mutationFn: (formData) => submissionService.createSubmission(formData),
    onSuccess: (data) => {
      console.log('CREATE SUBMISSION MUTATION ', data)
      queryClient.refetchQueries(['submissions'])
      queryClient.refetchQueries(['vendors'])
      toast.success('Your form submission was successful!')
    },
    onError: (error) => {
      console.log('ERROR - CREATE SUBMISSION ', error)
      toast.error(error.message)
    },
  })

  return createSubmissionMutation
}

export default useCreateSubmission

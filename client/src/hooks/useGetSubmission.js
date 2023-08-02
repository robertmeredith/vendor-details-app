import { useQuery } from '@tanstack/react-query'
import submissionService from '../services/submissionService'
import useUser from './useUser'

const useGetSubmission = (submissionId) => {
  const user = useUser()

  const getSubmissionQuery = useQuery({
    queryFn: () => submissionService.getSubmission({ submissionId, user }),
    queryKey: ['submissions', submissionId],
  })

  return getSubmissionQuery
}
export default useGetSubmission

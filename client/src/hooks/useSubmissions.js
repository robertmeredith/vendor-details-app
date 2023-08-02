import { useQuery } from '@tanstack/react-query'
import useUser from '../hooks/useUser'
import submissionService from '../services/submissionService'

const useGetAllSubmissions = () => {
  const user = useUser()
  const fallback = { count: 0, submissions: [] }

  const getAllSubmissionsQuery = useQuery({
    queryKey: ['submissions'],
    queryFn: () => submissionService.fetchAllUserSubmissions(user),
    placeholderData: fallback,
  })

  return getAllSubmissionsQuery
}

export default useGetAllSubmissions

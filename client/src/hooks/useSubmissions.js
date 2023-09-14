import { useQuery, useQueryClient } from '@tanstack/react-query'
import useUser from '../hooks/useUser'
import submissionService from '../services/submissionService'
import useAuth from './useAuth'
import useErrorHandling from './useErrorHandling'

const useGetAllSubmissions = () => {
  const { handleError } = useErrorHandling()

  const user = useUser()
  const { logout } = useAuth()
  const fallback = { count: 0, submissions: [] }

  const getAllSubmissionsQuery = useQuery({
    queryKey: ['submissions'],
    queryFn: () => submissionService.fetchAllUserSubmissions(user),
    placeholderData: fallback,
    onError: (error) => handleError(error)
  })

  return getAllSubmissionsQuery
}

export default useGetAllSubmissions

import { useQuery } from '@tanstack/react-query'
import useUser from '../hooks/useUser'
import axios from 'axios'
import localStorageHelper from '../helpers/localStorageHelper'

// fetch all submissions - no auth validation - returns all submissions in system
const fetchAllUserSubmissions = async (user) => {
  const { data } = await axios.get('/api/v1/submissions', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

// fetch submissions for current logged in user
const getCurrentUserSubmissions = async (user) => {
  const { data } = await axios.get('/api/v1/submissions/showAllMySubmissions', {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data
}

const useSubmissions = () => {
  const user = useUser()
  const fallback = { count: 0, submissions: [] }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => fetchAllUserSubmissions(user),
    placeholderData: fallback,
  })

  return { data, isLoading, isError }
}

export default useSubmissions

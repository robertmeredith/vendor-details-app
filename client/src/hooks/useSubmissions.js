import { useQuery } from '@tanstack/react-query'
import useUser from '../hooks/userUser'
import axios from 'axios'
import localStorageHelper from '../helpers/localStorageHelper'

// fetch all submissions - no auth validation - returns all submissions in system
const fetchAllUserSubmissions = async () => {
  // NEEDS CHANGING TO USER SUBMISSIONS - CURRENTLY FETCHING ALL
  const { data } = await axios.get('/api/v1/submissions')
  return data
}

// fetch submissions for current logged in user
const getCurrentUserSubmissions = async () => {
  const user = localStorageHelper.getStoredUser()
  const { data } = await axios.get('/api/v1/submissions/showAllMySubmissions', {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data
}

const useSubmissions = () => {
  // get current logged in user
  const { user } = useUser()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['submissions'],
    queryFn: (user) => getCurrentUserSubmissions(),
    initialData: { count: 99, submissions: [] },
  })

  return { data, isLoading, isError }
}

export default useSubmissions

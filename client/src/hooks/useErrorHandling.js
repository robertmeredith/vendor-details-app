import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import localStorageHelper from '../helpers/localStorageHelper'
import { toast } from 'react-toastify'

function useErrorHandling() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleError = (error) => {
    console.log('handleError - error handler triggered ', error)
    if (error.response?.status === 401) {
      navigate('/login')
      localStorageHelper.clearStoredUser()
      queryClient.setQueryData(['user'], null)
      toast.warning(error.response.data.msg, 2)
    } else {
      // Handle other error cases here if needed
      console.log(error)
      toast.warning(error.response.data.msg, 2)
    }
  }

  return { handleError }
}

export default useErrorHandling

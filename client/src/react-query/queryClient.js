// Create a query client
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import localStorageHelper from '../helpers/localStorageHelper'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      // onError: (error) => {
      //   if (error.response.status === 401) {
      //     localStorageHelper.clearStoredUser()
      //   }
      //   console.log('/queryClient.js - Default Error Handler: ', error.message)
      //   toast(error.response?.data.message)
      // },
    },
  },
})

export default queryClient

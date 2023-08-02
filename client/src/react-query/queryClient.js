// Create a query client
import { QueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 1,
      onError: (error) => {
        console.log('/queryClient.js - Default Error Handler: ', error.message)
        toast(error.response?.data.message)
      },
    },
  },
})

export default queryClient

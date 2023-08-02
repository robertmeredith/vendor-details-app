import { useMutation, useQueryClient } from '@tanstack/react-query'
import settingsService from '../services/settingsService'
import { toast } from 'react-toastify'
import useUser from './useUser'

const useUpdateSettings = () => {
  const user = useUser()

  const updateSettingsMutation = useMutation({
    mutationFn: (settingsData) =>
      settingsService.updateUserSettings({ settingsData, user }),
    onSuccess: (data) => {
      toast.success('Settings updated', 2)
    },
    onError: (error) => {
      toast.error(error.response.data.msg, 2)
    },
  })

  return updateSettingsMutation
}

export default useUpdateSettings

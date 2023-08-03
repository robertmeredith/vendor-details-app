import useUser from '../hooks/useUser'
import { Navigate } from 'react-router-dom'

const Auth = ({ children }) => {
  const user = useUser()

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

export default Auth

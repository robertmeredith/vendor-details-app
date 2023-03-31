import axios from 'axios'
import { useState, useEffect } from 'react'
import Alert from '../components/Alert'

const Register = () => {
  const [name, setName] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isMember, setIsMember] = useState(false)

  // USEEFFECT - for disabling alert after 3 seconds
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false)
        setAlertMessage('')
      }, 3000)
    }
  }, [showAlert])

  const toggleMember = () => {
    setIsMember(!isMember)
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `/api/v1/auth/${isMember ? 'login' : 'register'}`,
        {
          name,
          email,
          password,
        }
      )
      console.log(response)
    } catch (error) {
      console.log('ERROR', error.response.data.msg)
      setAlertMessage(error.response.data.msg)
      setShowAlert(true)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-center uppercase">
              Welcome to the Vendor App
            </h1>

            <p className="mt-6 text-center">
              Please {isMember ? 'login' : 'register'} below
            </p>
            <div className="form-control w-full max-w-xs">
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                type="text"
                name="name"
                className="input input-bordered input-accent w-full max-w-xs mt-6"
                value={name}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="text"
                name="email"
                className="input input-bordered input-accent w-full max-w-xs mt-6"
                value={email}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                className="input input-bordered input-accent w-full max-w-xs mt-6"
                value={password}
              />
            </div>
            <button
              className="btn btn-accent w-full mt-8 uppercase"
              type="submit"
            >
              Submit
            </button>
            <button
              className=" w-full mt-8"
              onClick={toggleMember}
              // disable={isLoading}
            >
              {isMember ? 'Register' : 'Login'}
            </button>
          </form>
          {/* ALERT */}
          <Alert showAlert={showAlert} alertMessage={alertMessage} />
        </div>
      </div>
    </div>
  )
}

export default Register

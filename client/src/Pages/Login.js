import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  useEffect(() => {
    console.log('EMAIL', email, 'PASSWORD', password)
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
      })
      console.log(response)
    } catch (error) {
      console.log('ERROR', error.response.data.msg)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-center uppercase">Welcome Back!</h1>
            <p className="mt-6 text-center">Please sign in to your account</p>
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

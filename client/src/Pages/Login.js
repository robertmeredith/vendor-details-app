import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  useEffect(() => {
    console.log('EMAIL', email, 'PASSWORD', password)
  }, [email, password])

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/login', { email, password })
      console.log(response)
    } catch (error) {
      console.log('ERROR', error.response.data.msg)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <form>
            <h1 className="font-bold text-center uppercase">
              Welcome to the Vendor App
            </h1>
            <p className="mt-6 text-center">Please sign in to your account</p>
            <div className="form-control w-full max-w-xs">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="text"
                name="email"
                className="input input-bordered input-accent w-full max-w-xs mt-6"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                className="input input-bordered input-accent w-full max-w-xs mt-6"
              />
            </div>

            <button
              className="btn btn-accent w-full mt-8 uppercase"
              onClick={(e) => handleClick(e)}
            >
              Sign In
            </button>
          </form>

          {/* <h2 className="card-title cen">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Login

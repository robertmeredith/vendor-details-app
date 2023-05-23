import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import axios from 'axios'
import CustomInput from '../components/CustomInput'
import Alert from '../components/Alert'
import { loginSchema } from '../validation'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // USEEFFECT - for disabling alert after 3 seconds
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false)
        setAlertMessage('')
      }, 3000)
    }
  }, [showAlert])

  const handleSubmit = async (values, helpers) => {
    try {
      const { data } = await axios.post('/api/v1/auth/login', values)
      helpers.resetForm()
      console.log('/Login', data)
    } catch (error) {
      console.log('/Login - error', error.response.data.msg)
      setAlertMessage(`Error = ${error.response.data.msg}`)
      setShowAlert(true)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
          >
            {(props) => (
              <Form>
                {/* Email */}
                <CustomInput
                  labelText="Email"
                  type="text"
                  name="email"
                  placeholder="email"
                />
                {/* Password */}
                <CustomInput
                  labelText="Password"
                  type="password"
                  name="password"
                  placeholder="password"
                />
                {/* Login Button */}
                <button
                  type="submit"
                  disabled={!props.dirty || props.isSubmitting}
                  className="btn btn-success mt-4"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <Alert showAlert={showAlert} alertMessage={alertMessage} />
          {/* <form onSubmit={handleSubmit}>
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
          </form> */}
        </div>
      </div>
    </div>
  )
}

export default Login

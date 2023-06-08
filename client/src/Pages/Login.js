import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import CustomInput from '../components/CustomInput'
import Alert from '../components/Alert'
import { loginSchema } from '../validation'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/authReducer'
import { alertError, alertWarning } from '../reducers/alertReducer'
import { useMutation } from '@tanstack/react-query'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { alertSuccess } from '../reducers/alertReducer'
import localStorageHelper from '../helpers/localStorageHelper'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const alert = useSelector((state) => state.alert)

  // Login mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: authService.login,
    onSuccess: (userData) => {
      console.log('USER', userData)
      if (userData) {
        localStorageHelper.setStoredUser(userData)
        navigate('/')
        toast.success('Logged in!')
      }
    },
    onError: (error) => {
      dispatch(alertWarning(error.response.data.msg, 5))
    },
  })

  // Handle Login form submit
  const handleSubmit = async (values, helpers) => {
    // try {
    //   dispatch(login(values))
    //   helpers.resetForm()
    // } catch (error) {
    //   dispatch(alertError(`Error = ${error.response.data.msg}`))
    // }
    mutate(values)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <h2>Login</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={loginSchema}
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
          <Alert alert={alert} />
        </div>
      </div>
    </div>
  )
}

export default Login

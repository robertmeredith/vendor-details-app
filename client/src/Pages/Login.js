import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import CustomInput from '../components/CustomInput'
import Alert from '../components/Alert'
import { loginSchema } from '../validation'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/authReducer'
import { alertError } from '../reducers/alertReducer'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert)

  console.log('ALERT', alert)

  // Handle Login form submit
  const handleSubmit = async (values, helpers) => {
    try {
      dispatch(login(values))
      helpers.resetForm()
    } catch (error) {
      dispatch(alertError(`Error = ${error.response.data.msg}`))
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <h2>Login</h2>
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
          <Alert alert={alert} />
        </div>
      </div>
    </div>
  )
}

export default Login

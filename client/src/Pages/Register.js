import { Formik, Form } from 'formik'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import CustomInput from '../components/CustomInput'
import { registrationSchema } from '../validation'

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
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

  // HANDLE SUBMIT
  const handleSubmit = async (values, helpers) => {
    try {
      const response = await axios.post(`/api/v1/auth/register`, values)
      helpers.resetForm()
      console.log('/RegisterForm', response)
    } catch (error) {
      console.log('/RegisterForm - error', error.response.data.msg)
      setAlertMessage(error.response.data.msg)
      setShowAlert(true)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                {/* Name */}
                <CustomInput
                  labelText="Name"
                  type="text"
                  name="name"
                  placeholder="name"
                />
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
                {/* Confirm Password */}
                <CustomInput
                  labelText="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                />
                {/* Register button */}
                <button
                  type="submit"
                  disabled={!props.dirty || props.isSubmitting}
                  className="btn btn-success"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          {/* ALERT */}
          <Alert showAlert={showAlert} alertMessage={alertMessage} />
        </div>
      </div>
    </div>
  )
}

export default Register

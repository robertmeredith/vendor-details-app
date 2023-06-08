import { Formik, Form } from 'formik'
import Alert from '../components/Alert'
import CustomInput from '../components/CustomInput'
import { registrationSchema } from '../validation'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useMutation } from '@tanstack/react-query'
import { alertSuccess } from '../reducers/alertReducer'
import { useDispatch, useSelector } from 'react-redux'

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get Alert state
  const alert = useSelector((state) => state.alert)

  // Create user mutation
  const registerUserMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      console.log('USER', data)
      if (data) {
        navigate('/')
      }
      toast.success('You successfully registered!')
    },
    onError: (error) => {
      dispatch(alertSuccess(error.response.data.msg, 5))
    },
  })

  // HANDLE SUBMIT
  const handleSubmit = async (values) => {
    registerUserMutation.mutate(values)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-60">
        <div className="card-body">
          <h1>Register</h1>
          <Formik
            initialValues={initialValues}
            // validationSchema={registrationSchema}
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
          <Alert alert={alert} />
        </div>
      </div>
    </div>
  )
}

export default Register

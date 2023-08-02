import { Formik, Form } from 'formik'
import Alert from '../components/Alert'
import CustomFormikInput from '../components/CustomFormikInput'
import { registrationSchema } from '../validation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useMutation } from '@tanstack/react-query'
import { alertSuccess } from '../reducers/alertReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
    <div className="flex min-h-full flex-1 flex-col justify-center py-28 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-4 py-12">
        {/* <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12"> */}
        {/* FORMIK FORM */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registrationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              {/* Email */}
              <div className="flex flex-col gap-y-2">
                <CustomFormikInput
                  id="email"
                  labelText="Email address"
                  type="text"
                  name="email"
                />
                {/* Password */}
                <CustomFormikInput
                  id="password"
                  labelText="Password"
                  type="password"
                  name="password"
                />
                {/* Confirm Password */}
                <CustomFormikInput
                  id="confirmPassword"
                  labelText="Confirm Password"
                  type="password"
                  name="confirmPassword"
                />

              </div>
              {/* Login Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!props.dirty || props.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign in here
        </Link>
      </p>
      {/* </div> */}
    </div>
  )
}

export default Register

import { Formik, Form } from 'formik'
import CustomFormikInput from '../components/CustomFormikInput'

import { loginSchema } from '../validation'
import { useSelector } from 'react-redux'

import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const { loginUser } = useAuth()

  // Handle Login form submit
  const handleSubmit = async (values) => {
    loginUser(values)
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-4 py-12">
        {/* <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12"> */}
        {/* FORMIK FORM */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
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
                  autoComplete="email"
                />
                {/* Password */}
                <CustomFormikInput
                  id="password"
                  labelText="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                />
                {/* FORGOT PASSWORD */}

                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-gray-900"
                    >
                      Remember me
                    </label>
                  </div> */}

                  <div className="text-sm leading-6">
                    <Link
                      to="/password-reset"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
              {/* Login Button */}
              <div className="mt-10">
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
        Not registered?{' '}
        <Link
          to="/register"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign up here
        </Link>
      </p>
      {/* </div> */}
    </div>
  )
}

export default Login

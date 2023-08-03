import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import CustomFormikInput from '../components/CustomFormikInput'

const initialValues = {
  email: '',
}

const ResetPassword = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-28 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-4 py-12">
        {/* <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12"> */}
        {/* FORMIK FORM */}
        <Formik
          initialValues={initialValues}
          // onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              {/* Email */}
              <div className="flex flex-col gap-y-4">
                <CustomFormikInput
                  id="email"
                  labelText="Email address"
                  type="text"
                  name="email"
                  autoComplete="email"
                />

                {/* Login Button */}

                <button
                  type="submit"
                  disabled={!props.dirty || props.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
                >
                  Reset
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

export default ResetPassword

import { Formik, Form } from 'formik'
import CustomFormikInput from './CustomFormikInput'

import InputWithInlineAddon from './InputWithInlineAddon'
import CustomTextArea from './CustomTextArea'
import { formatInstagramUsername, formatUrl } from '../helpers/validationHelper'
import { vendorSchema } from '../validation'
import useCreateVendor from '../hooks/useCreateVendor'
import Alert from './Alert'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const initialFormData = {
  name: '',
  instagram: '',
  website: '',
  email: '',
}

const NewVendorForm = () => {
  const navigate = useNavigate()
  const { mutate } = useCreateVendor()
  const alert = useSelector((state) => state.alert)

  // SUBMIT VENDOR FORM
  const submitVendorForm = (values, resetForm) => {
    mutate(values, { onSuccess: resetForm })
  }

  return (
    <>
      {/* Form */}
      <Formik
        // enableReinitialize allows Form to update if a different vendor is seleced to edit
        enableReinitialize={true}
        initialValues={initialFormData}
        validationSchema={vendorSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitVendorForm(values, resetForm)
          setSubmitting(false)
        }}
      >
        {(props) => (
          <Form>
            <div className="border p-12 pb-28 border-t-0 rounded-b-3xl">
              <div className="mt-24">
                {/* Start Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 border-b border-gray-900/10 pb-12">
                  <CustomFormikInput
                    autoComplete="off"
                    id="name"
                    labelText="Vendor name"
                    type="text"
                    name="name"
                    placeholder=""
                  />
                  {/* Instagram */}
                  <InputWithInlineAddon
                    autoComplete="off"
                    addon="instagram.com/"
                    id="instagram"
                    labelText="Instagam"
                    type="text"
                    name="instagram"
                    // placeholder="username"
                    onBlur={(event) => {
                      // call the built-in handleBlur
                      props.handleBlur(event)
                      // format the instagram handle
                      const formatted = formatInstagramUsername(
                        props.values['instagram']
                      )
                      // set the formatted value
                      props.setFieldValue('instagram', formatted)
                    }}
                  />
                  {/* Website */}
                  <InputWithInlineAddon
                    autoComplete="off"
                    addon="https://www."
                    id="website"
                    labelText="Website"
                    type="text"
                    name="website"
                    onBlur={(event) => {
                      // call the built-in handleBlur
                      props.handleBlur(event)
                      // format the url handle
                      const formatted = formatUrl(
                        props.values['website']
                      )
                      // set the formatted value
                      props.setFieldValue('website', formatted)
                    }}
                  />
                  {/* Email */}
                  <CustomFormikInput
                    autoComplete="off"
                    id="email"
                    labelText="Email"
                    type="email"
                    name="email"
                    // placeholder="you@example.com"
                  />

                  {/* Notes Text Area */}
                  <CustomTextArea
                    autoComplete="off"
                    labelText="Notes"
                    type="text"
                    name="notes"
                    description="Enter any useful vendor notes here, these will be visible only to you"
                  />
                </div>
                {/* End Grid ^ */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => navigate('/vendors')}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={props.isSubmitting || !props.dirty}
                    className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition`}
                  >
                    Add Vendor
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Alert alert={alert} />
      {/* End Form */}
    </>
  )
}

export default NewVendorForm

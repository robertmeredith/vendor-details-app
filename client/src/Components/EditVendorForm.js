import { Formik, Form } from 'formik'
import CustomFormikInput from './CustomFormikInput'
import InputWithAddon from './InputWithAddon'
import InputWithInlineAddon from './InputWithInlineAddon'
import CustomTextArea from './CustomTextArea'
import { formatInstagramUsername, formatUrl } from '../helpers/validationHelper'
import { vendorSchema } from '../validation'
import useUpdateVendor from '../hooks/useUpdateVendor'
import useDeleteVendor from '../hooks/useDeleteVendor'
import Alert from './Alert'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditVendorForm = ({ vendorToEdit }) => {
  const navigate = useNavigate()
  const { mutate: updateVendor } = useUpdateVendor()
  const { mutate: deleteVendor } = useDeleteVendor()
  const alert = useSelector((state) => state.alert)

  // SUBMIT VENDOR FORM
  const submitVendorForm = (values) => {
    updateVendor(values)
  }

  // REMOVE VENDOR
  const removeVendor = (e) => {
    deleteVendor(vendorToEdit)
    navigate('/vendors')
  }

  return (
    <>
      {/* Form */}
      <Formik
        // enableReinitialize allows Form to update if a different vendor is seleced to edit
        enableReinitialize={true}
        initialValues={vendorToEdit}
        validationSchema={vendorSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitVendorForm(values)
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
                    id="name"
                    labelText="Vendor name"
                    type="text"
                    name="name"
                    placeholder=""
                  />
                  {/* Instagram */}
                  <InputWithInlineAddon
                    addon="instagram.com/"
                    id="instagram"
                    labelText="Instagam"
                    type="text"
                    name="instagram"
                    placeholder="username"
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
                      const formatted = formatUrl(props.values['website'])
                      // set the formatted value
                      props.setFieldValue('website', formatted)
                    }}
                  />
                  {/* Email */}
                  <CustomFormikInput
                    id="email"
                    labelText="Email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                  />

                  {/* Notes Text Area */}
                  <CustomTextArea
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
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={(e) => removeVendor(e)}
                    className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 transition`}
                  >
                    Delete
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

export default EditVendorForm

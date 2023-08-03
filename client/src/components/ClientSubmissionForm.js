import { InputGroupNew } from './InputGroupNew'
import { createEmptyVendor } from '../helpers/defaultFormHelper'
import useCreateSubmission from '../hooks/useCreateSubmission'
import CustomFormikInput from './CustomFormikInput'
import { Formik, Form } from 'formik'
import CustomDatePicker from './CustomDatePicker'
import useGetUserVendors from '../hooks/useGetUserVendors'
import useGetUserSettings from '../hooks/useGetUserSettings'
import { clientFormSchema } from '../validation'
import UserDetailsInputGroup from './UserDetailsInputGroup'

const ClientSubmissionForm = ({ userId }) => {
  // SUBMIT FORM MUTATION
  const { mutate: submitForm } = useCreateSubmission()

  // GET USER VENDORS
  const getUserVendors = useGetUserVendors(userId)

  // GET USER FORM SETTNGS
  const userSettings = useGetUserSettings(userId)
  console.log('USER SETTINGS ', userSettings.data)

  // Show loading state
  if (getUserVendors.isLoading || userSettings.isLoading) {
    return <p>Loading....</p>
  }

  const defaultVendorTypes = userSettings.data.defaultVendorTypes

  const initialValues = {
    user: userId,
    client: '',
    partner: '',
    email: '',
    date: { startDate: null, endDate: null },
    vendors: defaultVendorTypes.map((type) => createEmptyVendor(type)),
  }

  // Remove Form Input Row
  const removeFormInputRow = (currentValues, setValues, index) => {
    // Remove the row from the array
    const newVendors = currentValues.vendors.filter((vendor, i) => i !== index)
    setValues({
      ...currentValues,
      vendors: newVendors,
    })
  }

  // Add Form Input Row
  const addFormInputRow = (currentValues, setValues) => {
    const newVendor = createEmptyVendor()
    setValues({
      ...currentValues,
      vendors: [...currentValues.vendors, newVendor],
    })
  }

  return (
    <Formik
      // enableReinitialize allows Form to update if a different vendor is seleced to edit
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={clientFormSchema}
      // TODO: Add Validation Schema
      onSubmit={(values, { setSubmitting, resetForm }) => {
        submitForm(values)
        setSubmitting(false)
      }}
    >
      {(props) => (
        <Form>
          <div className="pb-28 px-2 sm:px-0 mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2">
              {/* CLIENT NAME */}
              <CustomFormikInput
                name="client"
                labelText="Your name"
                type="text"
                id="client"
              />
              {/* PARTNER NAME */}
              <CustomFormikInput
                name="partner"
                labelText="Partner's name"
                type="text"
                id="partner"
              />
              {/* EMAIL */}
              <CustomFormikInput
                name="email"
                labelText="Contact email"
                type="email"
                id="email"
              />
              {/* EVENT DATE */}
              <CustomDatePicker
                labelText={'Date of event'}
                name={'date'}
                value={props.values.date}
                handleChange={(newValue) =>
                  props.setFieldValue('date', newValue)
                }
              />
            </div>

            <div className="col-span-full flex flex-col gap-y-16 md:gap-y-8 border-b pb-20 mt-12">
              {/* INPUT GROUP FOR USER DETAILS */}
              {userSettings.data.userBusiness.includeOnForm && (
                <UserDetailsInputGroup
                  disabled={true}
                  userDetails={userSettings.data.userBusiness}
                />
              )}
              {/* INPUT GROUPS */}
              {props?.values?.vendors?.map((entry, index) => (
                <InputGroupNew
                  key={entry.key}
                  defaultVendorTypes={defaultVendorTypes}
                  index={index}
                  setFieldValue={props.setFieldValue}
                  allVendors={getUserVendors.data.vendors}
                  formRowValues={entry}
                  values={props.values}
                  removeRow={() =>
                    removeFormInputRow(props.values, props.setValues, index)
                  }
                  setValues={props.setValues}
                />
              ))}
            </div>
            {/* BUTTON CONTAINER */}
            <div className="flex gap-x-4 mt-8">
              {/* ADD ROW BUTTON */}
              <button
                type="button"
                className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => addFormInputRow(props.values, props.setValues)}
              >
                Add Vendor
              </button>
              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ClientSubmissionForm

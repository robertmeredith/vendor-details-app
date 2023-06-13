import { Formik, Form } from 'formik'
import CustomInput from './CustomInput'
import { formatInstagramUsername } from '../helpers/validationHelper'
import { vendorSchema } from '../validation'
import { useQueryClient } from '@tanstack/react-query'
import useVendors from '../hooks/useVendors'

// const initialFormData = {
//   name: '',
//   instagram: '',
//   website: '',
//   email: '',
// }
const emptyFormData = {
  name: '',
  instagram: '',
  website: '',
  email: '',
}

const initialFormData = {
  name: 'robbie',
  instagram: '@robbbie',
  email: 'robbie@hotmail.com',
  website: 'https://www.robbie.com',
}

const NewVendorForm = () => {
  const { createVendor, updateVendor, newError } = useVendors()

  // SUBMIT VENDOR FORM
  const submitVendorForm = async (vendorDetails, setValues) => {
    // on backend check if user id matches record
    if (vendorDetails._id) {
      await updateVendor(vendorDetails)
    } else {
      await createVendor(vendorDetails)
      console.log('NEW ERROR', newError)
      if (newError) {
        console.log('NOW??')
      }
    }
  }

  return (
    <div>
      <h1>Vendor Form</h1>
      <Formik
        // enableReinitialize allows Form to update if a different vendor is seleced to edit
        enableReinitialize={true}
        initialValues={initialFormData}
        validationSchema={vendorSchema}
        onSubmit={(values, { setSubmitting, setValues }) => {
          setTimeout(() => {
            setValues(emptyFormData)
            submitVendorForm(values, setValues)
            setSubmitting(false)
          }, 2000)
        }}
      >
        {(props) => (
          <Form>
            {/* Vendor Name */}
            <CustomInput
              labelText="Vendor name"
              type="text"
              name="name"
              placeholder="name"
            />
            {/* Instagram */}
            <CustomInput
              labelText="Instagram username"
              type="text"
              name="instagram"
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
              placeholder="instagram"
            />
            {/* Website */}
            <CustomInput
              labelText="website"
              type="text"
              name="website"
              placeholder="website"
            />
            {/* Email */}
            <CustomInput
              labelText="email"
              type="email"
              name="email"
              placeholder="email"
            />
            {/* Submit button */}
            <button
              type="submit"
              // disabled={props.isSubmitting || !props.dirty}
              className="btn btn-success mt-4"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewVendorForm

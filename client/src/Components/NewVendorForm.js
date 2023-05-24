import { Formik, Form } from 'formik'
import CustomInput from './CustomInput'
import { formatInstagramUsername } from '../helpers/validationHelper'
import { vendorSchema } from '../validation'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

// EDIT VENDOR FUNCTION
const updateVendor = async (updatedVendor) => {
  const { data } = await axios.put(
    `/api/v1/vendors/${updatedVendor._id}`,
    updatedVendor,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODQ4ODUzNzEsImV4cCI6MTY4NTQ5MDE3MX0.yIJ5hF9wnsE28vopJbL-JmYU71EZw-ClsvkoV-K9YgQ',
      },
    }
  )
  return data
}

// CREATE VENDOR FUNCTION
const createVendor = async (newVendor) => {
  const { data } = await axios.post(`/api/v1/vendors`, newVendor, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODQ4ODUzNzEsImV4cCI6MTY4NTQ5MDE3MX0.yIJ5hF9wnsE28vopJbL-JmYU71EZw-ClsvkoV-K9YgQ',
    },
  })
  return data
}

const initialVendorState = {
  name: '',
  instagram: '',
  website: '',
  email: '',
}

// NEW VENDOR FORM

const NewVendorForm = ({
  initialFormValues,
  setInitialFormValues,
  setShowForm,
}) => {
  const queryClient = useQueryClient()

  // UPDATE VENDOR MUTATION
  const updateVendorMutation = useMutation({
    mutationFn: updateVendor,
    onSuccess: ({ vendor: updatedVendor }) => {
      setShowForm(false)
      const { vendors } = queryClient.getQueryData(['vendors'])
      queryClient.setQueryData(['vendors'], {
        count: vendors.length,
        vendors: vendors.map((v) =>
          updatedVendor._id === v._id ? updatedVendor : v
        ),
      })
    },
    onError: (error, vendorDetails) => setInitialFormValues(vendorDetails),
  })

  // CREATE VENDOR MUTATION
  const createVendorMutation = useMutation({
    mutationFn: createVendor,
    onSuccess: ({ vendor: newVendor }) => {
      setShowForm(false)
      const { vendors } = queryClient.getQueryData(['vendors'])
      queryClient.setQueryData(['vendors'], {
        count: vendors.length + 1,
        vendors: [...vendors, newVendor],
      })
    },
    onError: (error, vendorDetails) => setInitialFormValues(vendorDetails),
  })

  // SUBMIT VENDOR FORM
  const submitVendorForm = (vendorDetails) => {
    // on backend check if user id matches record
    if (vendorDetails._id) {
      updateVendorMutation.mutate(vendorDetails)
    } else {
      createVendorMutation.mutate(vendorDetails)
    }
  }

  return (
    <div>
      <h1>Vendor Form</h1>
      <Formik
        // enableReinitialize allows Form to update if a different vendor is seleced to edit
        enableReinitialize={true}
        initialValues={initialFormValues}
        validationSchema={vendorSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            submitVendorForm(values)
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
                const formatted = formatInstagramUsername(props.values['instagram'])
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
              disabled={props.isSubmitting || !props.dirty}
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

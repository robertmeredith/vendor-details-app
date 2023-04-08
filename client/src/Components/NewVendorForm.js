import { Formik } from 'formik'
import FormikRow from './FormikRow'
import { formatInstagramUsername } from '../helpers/validationHelper'
import * as Yup from 'yup'

const VendorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  instagram: Yup.string().max(30, 'Too Long!'),
  website: Yup.string().url(),
  email: Yup.string().email('Invalid email'),
})

const NewVendorForm = ({
  vendorDetails,
  setVendorDetails,
  submitVendorForm,
  setShowForm,
}) => {
  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        // enables Form to update if a different vendor is seleced to edit
        enableReinitialize={true}
        initialValues={vendorDetails}
        validationSchema={VendorSchema}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values)
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          //   setSubmitting(false)
          // }, 400)
          submitVendorForm(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <FormikRow
              type="text"
              name="name"
              handleChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="name"
            />
            {errors.name && touched.name && errors.name}
            <FormikRow
              type="text"
              name="instagram"
              handleChange={handleChange}
              onBlur={(event) => {
                // call the built-in handleBlur
                handleBlur(event)
                // format the phone number
                const formatted = formatInstagramUsername(values['instagram'])
                // set the formatted value
                setFieldValue('instagram', formatted)
              }}
              value={values.instagram}
              placeholder="instagram"
            />
            {errors.instagram && touched.instagram && errors.instagram}
            <FormikRow
              type="text"
              name="website"
              handleChange={handleChange}
              onBlur={handleBlur}
              value={values.website}
              placeholder="website"
            />
            {errors.website && touched.website && errors.website}
            <FormikRow
              type="email"
              name="email"
              handleChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="email"
            />
            {errors.email && touched.email && errors.email}
            {/* <p>{errors.email}</p> */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default NewVendorForm

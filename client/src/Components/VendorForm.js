import React from 'react'
import FormRow from './FormRow'

export const VendorForm = ({
  vendorDetails,
  setVendorDetails,
  submitVendorForm,
  setShowForm,
}) => {
  // CANCEL AND CLOSE FORM
  const handleCancelClick = () => {
    setVendorDetails({})
    setShowForm(false)
  }

  return (
    <form onSubmit={submitVendorForm}>
      <FormRow
        type="text"
        name="name"
        value={vendorDetails.name}
        handleChange={(e) =>
          setVendorDetails({
            ...vendorDetails,
            [e.target.name]: e.target.value,
          })
        }
        labelText="name"
      />
      <FormRow
        type="text"
        name="instagram"
        value={vendorDetails.instagram}
        handleChange={(e) =>
          setVendorDetails({
            ...vendorDetails,
            [e.target.name]: e.target.value,
          })
        }
        labelText="instagram"
      />
      <FormRow
        type="text"
        name="website"
        value={vendorDetails.website}
        handleChange={(e) =>
          setVendorDetails({
            ...vendorDetails,
            [e.target.name]: e.target.value,
          })
        }
        labelText="website"
      />
      <FormRow
        type="text"
        name="email"
        value={vendorDetails.email}
        handleChange={(e) =>
          setVendorDetails({
            ...vendorDetails,
            [e.target.name]: e.target.value,
          })
        }
        labelText="email"
      />
      <button type="submit">{vendorDetails._id ? 'Update' : 'Submit'}</button>
      <button type="button" onClick={handleCancelClick}>
        Cancel
      </button>
    </form>
  )
}

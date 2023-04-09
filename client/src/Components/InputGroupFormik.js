import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

// INPUT GROUP
export const InputGroupFormik = ({
  defaultType,
  defaultVendorTypes,
  index,
  setFormState,
  vendors,
}) => {
  const { values, handleChange, handleBlur, setValues } = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: defaultType,
      name: '',
      instagram: '',
      website: '',
      email: '',
      _id: '',
    },
  })

  // Filtered Vendors State
  const [filteredVendors, setFilteredVendors] = useState([])



  useEffect(() => {
    if (!values.name) {
      setFilteredVendors([])
    } else {
      setFilteredVendors(
        vendors.filter((v) =>
          v.name.toLowerCase().includes(values.name.toLowerCase())
        )
      )
    }
  }, [vendors, values.name])

  // Assign Vendor
  const assignVendor = (selectedVendor) => {
    setValues({ ...selectedVendor, type: values.type })
    setFormState((old) => {
      let newState = [...old]
      newState[index] = { type: values.type, vendor: values }
      return newState
    })
    setFilteredVendors([])
  }

  // Handle Input Change
  const handleInputChange = (event) => {
    handleChange(event)
    setFormState((old) => {
      let newState = [...old]
      newState[index] = { vendorType: values.type, vendor: values }
      return newState
    })
  }

  return (
    <>
      <select name="type" defaultValue={defaultType} onChange={handleChange}>
        {defaultVendorTypes.map((defaultType) => {
          return (
            <option key={defaultType} value={defaultType}>
              {defaultType}
            </option>
          )
        })}
      </select>
      <input
        name="name"
        type="text"
        placeholder="name"
        onChange={handleInputChange}
        value={values.name}
        disabled={values._id}
      />
      <input
        name="instagram"
        type="text"
        placeholder="instagram"
        onChange={handleInputChange}
        value={values.instagram}
        disabled={values._id}
      />
      <input
        name="website"
        type="text"
        placeholder="website"
        onChange={handleInputChange}
        value={values.website}
        disabled={values._id}
      />
      <ul>
        {/* SET THIS TO SHOW ONLY IF NAME IS FOCUSED */}
        {filteredVendors.map((vendor, index) => {
          return (
            <li key={index} onClick={() => assignVendor(vendor)}>
              {vendor.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}

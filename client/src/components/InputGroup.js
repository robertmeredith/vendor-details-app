import { useEffect, useState } from 'react'
import { Form } from 'formik'

export const InputGroup = ({
  defaultType,
  defaultVendorTypes,
  index,
  setFormState,
  allVendors,
  removeFormInputRow,
  setValues,
  values,
}) => {
  const [vendorType, setVendorType] = useState(defaultType)
  const [vendor, setVendor] = useState({
    name: '',
    instagram: '',
    website: '',
    email: '',
    _id: '',
  })

  // Filtered Vendors State
  const [filteredVendors, setFilteredVendors] = useState([])

  // handle input to show filtered vendors and update vendor state
  const handleInputChange = (event) => {
    if (event.target.name === 'name' && event.target.value) {
      setFilteredVendors(
        allVendors.filter((v) =>
          v.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      )
    } else {
      setFilteredVendors([])
    }
    setVendor({ ...vendor, [event.target.name]: event.target.value })
  }

  // HANDLE UPDATING OF MAIN FORM SUBMISSION STATE WHEN VENDOR CHANGES
  useEffect(() => {
    setFormState((prevState) => {
      prevState[index] = { vendorType, vendor }
      return prevState
    })
  }, [vendorType, vendor])

  // SELECT VENDOR FROM FILTERED LIST
  const selectVendor = (vendor) => {
    setVendor(vendor)
    setFilteredVendors([])
  }

  return (
    <div className="border border-indigo-600">
      <h1>Input Group {index}</h1>
      <select
        name="type"
        id="type"
        defaultValue={vendorType}
        onChange={(e) => setVendorType(e.target.value)}
      >
        <option disabled value="select">
          Please select
        </option>
        {defaultVendorTypes.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          )
        })}
      </select>
      <input
        name="name"
        type="text"
        id="name"
        placeholder="name"
        onChange={handleInputChange}
        value={vendor.name}
      />
      <input
        name="instagram"
        type="text"
        id="instagram"
        placeholder="instagram"
        onChange={handleInputChange}
        value={vendor.instagram}
      />
      <input
        name="website"
        type="text"
        id="website"
        placeholder="website"
        onChange={handleInputChange}
        value={vendor.website}
      />
      <ul>
        {/* SET THIS TO SHOW ONLY IF NAME IS FOCUSED */}
        {filteredVendors.map((vendor, index) => {
          return (
            <li key={index} onClick={() => selectVendor(vendor)}>
              {vendor.name}
            </li>
          )
        })}
      </ul>
      <button
        className="btn btn-xs btn-primary"
        onClick={() => removeFormInputRow(index)}
      >
        Remove
      </button>
    </div>
  )
}
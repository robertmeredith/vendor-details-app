import { useParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const defaultVendorTypes = [
  'photographer',
  'videographer',
  'celebrant',
  'venue',
]

const createEmptyVendor = (vendorType) => {
  return {
    vendorType,
    vendor: {
      name: '',
      instagram: '',
      website: '',
      email: '',
      _id: '',
    },
  }
}

// FETCH VENDORS FUNCTION
const fetchVendors = async (id) => {
  const { data } = await axios.get(`/api/v1/vendors?userId=${id}`)
  return data
}

const SubmissionFormPage = () => {
  const { userId } = useParams()
  const [formOwner, setFormOwner] = useState(userId)

  const [filteredVendors, setFilteredVendors] = useState([])

  // const [formState, setFormState] = useState(
  //   defaultVendorTypes.map((vendorType) => createEmptyVendor(vendorType))
  // )

  const [formState, setFormState] = useState([])

  useEffect(() => {
    console.log('FILTERED VENDORS', filteredVendors)
    console.log('FORM STATE', formState)
  }, [filteredVendors, formState])

  // GET USER VENDORS
  const vendorsQuery = useQuery({
    queryKey: ['vendors', userId],
    queryFn: () => fetchVendors(userId),
  })

  if (vendorsQuery.status === 'loading') {
    return <p>Loading....</p>
  }

  const handleChange = (e) => {
    !e.target.value
      ? setFilteredVendors([])
      : setFilteredVendors(
          vendorsQuery.data.vendors.filter((vendor) =>
            vendor.name.includes(e.target.value)
          )
        )
  }

  return (
    <div>
      <h1>Submission Form Page</h1>
      <form action="">
        <InputGroup
          index={0}
          defaultType={defaultVendorTypes[0]}
          defaultVendorTypes={defaultVendorTypes}
          handleChange={handleChange}
          filteredVendors={filteredVendors}
          formState={formState}
          setFormState={setFormState}
          vendors={vendorsQuery.data.vendors}
        />
        <button className='btn btn-outline'>Button</button>
      </form>
      <div></div>
    </div>
  )
}

export default SubmissionFormPage

// INPUT GROUP
const InputGroup = ({
  defaultType,
  defaultVendorTypes,
  index,
  setFormState,
  vendors,
}) => {
  const [type, setType] = useState(defaultType)
  const [vendor, setVendor] = useState({
    name: '',
    instagram: '',
    website: '',
    email: '',
    _id: '',
  })
  // Filtered Vendors State
  const [filteredVendors, setFilteredVendors] = useState([])
  const [filtering, setFiltering] = useState(false)

  const handleInputChange = (event) => {
    if (event.target.name === 'name') {
      setFilteredVendors(
        vendors.filter((v) =>
          v.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      )
    } else {
      setFilteredVendors([])
    }
    setVendor({ ...vendor, [event.target.name]: event.target.value })
  }

  // HANDLE UPDATING OF MAIN FORM SUBMISSION STATE
  useEffect(() => {
    setFormState((prevState) => {
      prevState[index] = { type, vendor }
      return prevState
    })
  }, [type, vendor])


  // SELECT VENDOR FROM FILTERED LIST
  const selectVendor = (vendor) => {
    setVendor(vendor)
    setFilteredVendors([])
  }

  return (
    <>
      <select
        name="type"
        id="type"
        defaultValue={defaultType}
        onChange={(e) => setType(e.target.value)}
      >
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
    </>
  )
}

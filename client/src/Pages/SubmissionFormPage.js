import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { InputGroup } from '../components/InputGroup'
import { v4 as uuid } from 'uuid'

const defaultVendorTypes = [
  'photographer',
  'videographer',
  'celebrant',
  'venue',
]

// Function to create empty vendor object
const createEmptyVendor = (type) => {
  return {
    key: uuid(),
    vendorType: type,
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

  // Create Initial State for Combined Form
  const [formState, setFormState] = useState(
    defaultVendorTypes.map((type) => createEmptyVendor(type))
  )

  // Useeffect purely to display state - DELETE LATER
  useEffect(() => {
    console.log('FORM STATE', formState)
  }, [formState])

  // GET USER VENDORS
  const vendorsQuery = useQuery({
    queryKey: ['vendors', userId],
    queryFn: () => fetchVendors(userId),
  })

  // Show loading state
  if (vendorsQuery.status === 'loading') {
    return <p>Loading....</p>
  }

  // Remove Row
  const removeFormInputRow = (index) => {
    setFormState((prevState) => {
      // Copy the previous state array
      const newState = [...prevState]
      // Remove the element at index
      newState.splice(index, 1)
      // Return the new state array
      return newState
    })
  }

  // Add Row
  const addRow = () => {
    setFormState([...formState, createEmptyVendor('select')])
  }

  return (
    <div>
      <h1>Submission Form Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log('FORM STATE ON SUBMIT', formState)
        }}
      >
        {formState.map((entry, index) => (
          <InputGroup
          // generate a unique key for each input group
            key={entry.key}
            index={index}
            defaultType={entry.vendorType}
            defaultVendorTypes={defaultVendorTypes}
            formState={formState}
            setFormState={setFormState}
            vendors={vendorsQuery.data.vendors}
            removeFormInputRow={removeFormInputRow}
          />
        ))}

        <button className="btn btn-outline" type="submit">
          Submit
        </button>
        <button className="btn btn-outline" onClick={addRow}>
          Add Vendor
        </button>
      </form>
      <div></div>
    </div>
  )
}

export default SubmissionFormPage

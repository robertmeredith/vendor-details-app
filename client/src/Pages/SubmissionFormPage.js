import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { InputGroup } from '../components/InputGroup'
import { v4 as uuid } from 'uuid'
import vendorService from '../services/vendorService'

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

const SubmissionFormPage = () => {
  const { userId } = useParams()

  const [client, setClient] = useState('')
  const [eventDate, setEventDate] = useState('')

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
    queryFn: () => vendorService.fetchVendors(userId),
  })

  // Show loading state
  if (vendorsQuery.status === 'loading') {
    return <p>Loading....</p>
  }

  // Remove Form Input Row
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

  // Add Form Input Row
  const addFormInputRow = () => {
    setFormState((prevState) => [...prevState, createEmptyVendor('select')])
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
        {/* ADD INPUT CLIENT NAME */}
        <input
          type="text"
          placeholder="client name"
          className="border border-indigo-600"
          onChange={() => setClient('')}
        />
        {/* ADD INPUT EVENT DATE */}
        {formState.map((entry, index) => (
          <InputGroup
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
        <button className="btn btn-outline" onClick={addFormInputRow}>
          Add Vendor
        </button>
      </form>
      <div></div>
    </div>
  )
}

export default SubmissionFormPage

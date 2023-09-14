import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { InputGroup } from '../components/InputGroup'
import { v4 as uuid } from 'uuid'
import vendorService from '../services/vendorService'
import Datepicker from 'react-tailwindcss-datepicker'
import useCreateSubmission from '../hooks/useCreateSubmission'

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
  const [partner, setPartner] = useState('')
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  })

  const { mutate } = useCreateSubmission()

  // Create Initial State for Combined Form
  const [formState, setFormState] = useState(
    defaultVendorTypes.map((type) => createEmptyVendor(type))
  )

  // Useeffect purely to display state - DELETE LATER
  useEffect(() => {
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

  // HANDLE SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      client,
      partner,
      eventDate: date.startDate,
      vendors: formState,
    }
    mutate(formData)
  }

  return (
    <div>
      <h1>Submission Form Page</h1>
      <form onSubmit={handleSubmit}>
        {/* CLIENT NAME */}
        <div className="form-control flex">
          <input
            value={client}
            type="text"
            placeholder="Your name"
            className="input w-full max-w-xs input-bordered"
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        {/* PARTNER NAME */}
        <div>
          <input
            value={partner}
            type="text"
            placeholder="Partners name"
            className="input w-full max-w-xs input-bordered"
            onChange={(e) => setPartner(e.target.value)}
          />
        </div>

        {/* ADD INPUT EVENT DATE */}

        <Datepicker
          useRange={false}
          asSingle={true}
          value={date}
          startWeekOn="mon"
          onChange={(newValue) => setDate(newValue)}
        />

        {/* INUT GROUPS */}
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

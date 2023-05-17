import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { VendorList } from '../components/VendorList'
import NewVendorForm from '../components/NewVendorForm'

// GET VENDORS FUNCTION
const getVendors = async () => {
  const { data } = await axios.get('/api/v1/vendors/showAllMyVendors', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODQyODAyNzgsImV4cCI6MTY4NDg4NTA3OH0.cY_CbIbLnzQpQcZJSnNZvehcUH6npsR7Ito8IYVpqI8',
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

const Vendors = () => {
  const [filter, setFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState(initialVendorState)

  // FETCH VENDOR LIST QUERY
  const vendorsQuery = useQuery({
    queryKey: ['vendors'],
    queryFn: getVendors,
  })

  console.log(vendorsQuery.data)

  // RENDERING
  if (vendorsQuery.isLoading) return <h1>Loading...</h1>
  if (vendorsQuery.isError)
    return <h1>{vendorsQuery.error.response.data.msg}</h1>

  // FILTER VENDORS WHEN SEARCHING - includes both name and website
  const filteredVendors = vendorsQuery.data.vendors.filter(
    (vendor) =>
      vendor.website.toLowerCase().includes(filter.toLowerCase()) ||
      vendor.name.toLowerCase().includes(filter.toLowerCase())
  )

  // SELECT VENDOR TO EDIT
  const handleVendorSelect = (vendorDetails) => {
    setInitialFormValues(vendorDetails)
    setShowForm(true)
  }

  return (
    <div>
      {/* Filter Box */}
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row">
          <input
            className="input input-bordered w-full max-w-xs ml-2"
            type="text"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search"
          />

          {/* New Vendor / Cancel button */}
          <button
            className="btn btn-secondary ml-2"
            onClick={() => {
              setInitialFormValues(initialVendorState)
              setShowForm((prev) => !prev)
            }}
          >
            {showForm ? 'Cancel' : 'New Vendor'}
          </button>
        </div>

        {/* Vendor records count */}
        <div className="badge badge-lg badge-accent mr-2">
          {vendorsQuery.data.count} vendor records
        </div>
      </div>

      {/* Vendor Form */}
      {showForm && (
        <NewVendorForm
          initialFormValues={initialFormValues}
          setInitialFormValues={setInitialFormValues}
          setShowForm={setShowForm}
        />
      )}

      {/* Vendor List */}
      <VendorList
        filteredVendors={filteredVendors}
        handleVendorSelect={handleVendorSelect}
      />
    </div>
  )
}
export default Vendors

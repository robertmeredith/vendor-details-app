import React, { useState } from 'react'
import { VendorList } from '../components/VendorList'
import NewVendorForm from '../components/NewVendorForm'
import useVendors from '../hooks/useVendors'
import { useNavigate } from 'react-router-dom'

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

  const { vendorsData, isLoading, isError, error } = useVendors()
  const navigate = useNavigate()

  // RENDERING
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{error.response.data.msg}</h1>

  // FILTER VENDORS WHEN SEARCHING - includes both name and website
  const filteredVendors = vendorsData.vendors.filter(
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
              // setInitialFormValues(initialVendorState)
              // setShowForm((prev) => !prev)
              navigate('/vendors/new')
            }}
          >
            {showForm ? 'Cancel' : 'New Vendor'}
          </button>
        </div>

        {/* Vendor records count */}
        <div className="badge badge-lg badge-accent mr-2">
          {vendorsData.count} vendor records
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

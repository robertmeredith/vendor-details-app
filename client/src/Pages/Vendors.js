import React, { useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { VendorForm } from '../components/VendorForm'
import { VendorList } from '../components/VendorList'
import { useQueryClient } from '@tanstack/react-query'
import NewVendorForm from '../components/NewVendorForm'

// GET VENDORS FUNCTION
const getVendors = async () => {
  const { data } = await axios.get('/api/v1/vendors/showAllMyVendors', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODA3MzQwNDcsImV4cCI6MTY4MTMzODg0N30.h_dLANw03iGcMnHXAmIrOBvKFuP1GAxd1GmVapPhc-w',
    },
  })
  return data
}

// EDIT VENDOR FUNCTION
const updateVendor = async (updatedVendor) => {
  const { data } = await axios.put(
    `/api/v1/vendors/${updatedVendor._id}`,
    updatedVendor,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODA3MzQwNDcsImV4cCI6MTY4MTMzODg0N30.h_dLANw03iGcMnHXAmIrOBvKFuP1GAxd1GmVapPhc-w',
      },
    }
  )
  return data
}

// CREATE VENDOR FUNCTION
const createVendor = async (newVendor) => {
  const { data } = await axios.post(`/api/v1/vendors`, newVendor, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODA3MzQwNDcsImV4cCI6MTY4MTMzODg0N30.h_dLANw03iGcMnHXAmIrOBvKFuP1GAxd1GmVapPhc-w',
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
  const queryClient = useQueryClient()

  const [filter, setFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [vendorDetails, setVendorDetails] = useState(initialVendorState)

  // FETCH VENDOR LIST QUERY
  const vendorsQuery = useQuery({
    queryKey: ['vendors'],
    queryFn: getVendors,
  })

  // UPDATE VENDOR MUTATION
  const updateVendorMutation = useMutation({
    mutationFn: updateVendor,
    onSuccess: ({ vendor: updatedVendor }) => {
      const { vendors } = queryClient.getQueryData(['vendors'])
      queryClient.setQueryData(['vendors'], {
        count: vendors.length,
        vendors: vendors.map((v) =>
          updatedVendor._id === v._id ? updatedVendor : v
        ),
      })
    },
  })

  // CREATE VENDOR MUTATION
  const createVendorMutation = useMutation({
    mutationFn: createVendor,
    onSuccess: ({ vendor: newVendor }) => {
      const { vendors } = queryClient.getQueryData(['vendors'])
      queryClient.setQueryData(['vendors'], {
        count: vendors.length,
        vendors: [...vendors, newVendor],
      })
    },
  })

  // HANDLE SUBMITTING VENDOR FORM
  const submitVendorForm = (e) => {
    e.preventDefault()
    if (vendorDetails._id) {
      updateVendorMutation.mutate(vendorDetails)
    } else {
      createVendorMutation.mutate(vendorDetails)
    }
    setVendorDetails(initialVendorState)
    setShowForm(false)
  }

  // RENDERING
  if (vendorsQuery.isLoading) return <h1>Loading...</h1>
  if (vendorsQuery.isError)
    return <h1>{vendorsQuery.error.response.data.msg}</h1>

  // FILTER VENDORS WHEN SEARCHING
  const filteredVendors = vendorsQuery.data.vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(filter.toLowerCase())
  )

  // SELECT VENDOR TO EDIT
  const handleVendorSelect = (vendorDetails) => {
    setVendorDetails(vendorDetails)
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
          <button
            className="btn btn-secondary ml-2"
            onClick={() => {
              setVendorDetails(initialVendorState)
              setShowForm((prev) => !prev)
            }}
          >
            {showForm ? 'Cancel' : 'New Vendor'}
          </button>
        </div>
        <div className="badge badge-lg badge-accent mr-2">
          {vendorsQuery.data.count} vendor records
        </div>
      </div>
      {/* EDIT VENDOR FORM */}
      {/* <NewVendorForm
        vendorDetails={vendorDetails}
        setShowForm={setShowForm}
        setVendorDetails={setVendorDetails}
        submitVendorForm={submitVendorForm}
      /> */}
      {showForm && (
        <NewVendorForm
          vendorDetails={vendorDetails}
          setShowForm={setShowForm}
          setVendorDetails={setVendorDetails}
          submitVendorForm={submitVendorForm}
        />
      )}
      <VendorList
        filteredVendors={filteredVendors}
        handleVendorSelect={handleVendorSelect}
      />
    </div>
  )
}
export default Vendors

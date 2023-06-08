import axios from 'axios'
const API_URL_VENDORS = '/api/v1/vendors'

// Fetch Vendors - used for fetching vendors for client form
const fetchVendors = async (id) => {
  const { data } = await axios.get(`${API_URL_VENDORS}?userId=${id}`)
  return data
}

// Get All Vendors - get logged in users vendors
const getAllVendors = async (user) => {
  if (!user) return null
  const { data } = await axios.get(`${API_URL_VENDORS}/showAllMyVendors`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data
}

// Create New Vendor
const createVendor = async (newVendor) => {
  const { data } = await axios.post(`/api/v1/vendors`, newVendor, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODQ4ODUzNzEsImV4cCI6MTY4NTQ5MDE3MX0.yIJ5hF9wnsE28vopJbL-JmYU71EZw-ClsvkoV-K9YgQ',
    },
  })
  return data
}

// Edit Vendor
const updateVendor = async (updatedVendor) => {
  const { data } = await axios.put(
    `/api/v1/vendors/${updatedVendor._id}`,
    updatedVendor,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODQ4ODUzNzEsImV4cCI6MTY4NTQ5MDE3MX0.yIJ5hF9wnsE28vopJbL-JmYU71EZw-ClsvkoV-K9YgQ',
      },
    }
  )
  return data
}

export default {
  fetchVendors,
  getAllVendors,
  createVendor,
  updateVendor,
}

import axios from 'axios'
const API_URL_VENDORS = '/api/v1/vendors'

const fakeData = {
  name: 'ro',
  instagram: '@robbbie',
  email: 'rob@hotmail.com',
  website: 'https://www.robbie.com',
}

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
const createVendor = async ({ vendorData, user }) => {
  const { data } = await axios.post(`/api/v1/vendors`, fakeData, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data
}

// Edit Vendor
const updateVendor = async ({ vendorData, user }) => {
  const { data } = await axios.put(
    `/api/v1/vendors/${vendorData._id}`,
    vendorData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
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

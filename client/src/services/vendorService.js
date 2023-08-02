import axios from 'axios'
const API_URL_VENDORS = '/api/v1/vendors'

// const fakeData = {
//   name: 'ro',
//   instagram: '@robbbie',
//   email: 'rob@hotmail.com',
//   website: 'https://www.robbie.com',
// }

// TEST
const testCreateVendor = async ({ vendorData, user }) => {
  const response = await axios.post(`/api/v1/vendors`, vendorData, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })

  return response
}

// Create New Vendor
const createVendor = async ({ vendorData, user }) => {
  const response = await axios.post(`${API_URL_VENDORS}`, vendorData, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  console.log('CREATE VENDOR SERVICE - DATA', response)
  return response.data
}

// Get Single Vendor
const getSingleVendor = async ({ vendorId, user }) => {
  if (!user) return null
  const { data } = await axios.get(`${API_URL_VENDORS}/${vendorId}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
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

// Edit Vendor
const updateVendor = async ({ vendorData, user }) => {
  const { data } = await axios.put(
    `${API_URL_VENDORS}/${vendorData._id}`,
    vendorData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return data
}

const deleteVendor = async ({ vendorData, user }) => {
  console.log('DELETE VENDOR SERVICE', vendorData)
  const { data } = await axios.delete(`${API_URL_VENDORS}/${vendorData._id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data
}

export default {
  testCreateVendor,
  getSingleVendor,
  getAllVendors,
  createVendor,
  updateVendor,
  deleteVendor,
}

import axios from 'axios'

// Fetch Vendors - used for fetching vendors for client form
export const fetchVendors = async (id) => {
  const { data } = await axios.get(`/api/v1/vendors?userId=${id}`)
  return data
}

// Get All Vendors - get logged in users vendors
export const getAllVendors = async () => {
  const { data } = await axios.get('/api/v1/vendors/showAllMyVendors', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODQ4ODUzNzEsImV4cCI6MTY4NTQ5MDE3MX0.yIJ5hF9wnsE28vopJbL-JmYU71EZw-ClsvkoV-K9YgQ',
    },
  })
  return data
}



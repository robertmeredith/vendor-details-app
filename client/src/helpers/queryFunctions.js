import axios from 'axios'

// Fetch Vendors
export const fetchVendors = async (id) => {
  const { data } = await axios.get(`/api/v1/vendors?userId=${id}`)
  return data
}



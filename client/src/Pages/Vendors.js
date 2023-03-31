import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import VendorCard from '../components/VendorCard'
import { useQuery } from '@tanstack/react-query'

const vendorFunction = async () => {
  console.log('VENDOR FUNCTION')
  const { data } = await axios.get('/api/v1/vendors')
  return data
}
const Vendors = () => {
  // const [userVendors, setUserVendors] = useState(undefined)

  // useEffect(() => {
  //   axios
  //     .get('/api/v1/vendors')
  //     .then((response) => {
  //       console.log(response.data)
  //       setUserVendors(response.data.vendors)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['vendors'],
    queryFn: vendorFunction,
  })


  // if (!userVendors) return <h1>Loading...</h1>
  if (isLoading) return <h1>Loading...</h1>

  const { vendors } = data

  return (
    <div>
      {vendors.map((vendorInfo) => {
        return <VendorCard key={vendorInfo._id} vendorInfo={vendorInfo} />
      })}
    </div>
  )
}

export default Vendors

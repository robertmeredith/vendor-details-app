import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import VendorCard from '../Components/VendorCard'

const Vendors = () => {
  const [userVendors, setUserVendors] = useState(undefined)

  useEffect(() => {
    axios
      .get('/vendors')
      .then((response) => {
        console.log(response.data)
        setUserVendors(response.data.vendors)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!userVendors) return <h1>Loading...</h1>

  return (
    <div>
      {userVendors.map((vendorInfo) => {
        return <VendorCard key={vendorInfo._id} vendorInfo={vendorInfo} />
      })}
    </div>
  )
}

export default Vendors

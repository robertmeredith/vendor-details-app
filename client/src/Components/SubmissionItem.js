import React from 'react'
import VendorItem from './VendorItem'

const SubmissionItem = ({ submission }) => {
  const { client, vendors } = submission

  return (
    <div>
      <h1>SUBMISSION ITEM</h1>
      <h2>Client: {client}</h2>
      {vendors.map((vendorItem) => {
        return <VendorItem vendorItem={vendorItem} />
      })}
    </div>
  )
}

export default SubmissionItem

import React from 'react'
import VendorItem from './VendorItem'
import { useNavigate } from 'react-router-dom'

const SubmissionItem = ({ submission }) => {
  const navigate = useNavigate()
  const { client, vendors } = submission

  console.log('SUBMISSION ITEM - client, vendors', client, vendors);

  return (
    <div className="border border-indigo-600">
      <h1>SUBMISSION LIST ITEM</h1>
      <button onClick={() => navigate(`/submissions/${submission._id}`)}>
        Client: {client}
      </button>
      {vendors.map((vendor) => {
        console.log('SUBMISSION ITEM - vendor in map', vendor);
        return <VendorItem key={vendor._id} vendorDetails={vendor} />
      })}
    </div>
  )
}

export default SubmissionItem

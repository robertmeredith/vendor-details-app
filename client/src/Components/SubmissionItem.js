import VendorItem from './VendorItem'

const SubmissionItem = ({ submission }) => {
  return (
    <div className="border border-indigo-600">
      <h1>SUBMISSION ITEM</h1>
      <p>Client name: {submission.client}</p>
      {submission.vendors.map((vendor) => {
        return <VendorItem vendorDetails={vendor} />
      })}
    </div>
  )
}

export default SubmissionItem

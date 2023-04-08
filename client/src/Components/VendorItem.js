const VendorItem = ({ vendorDetails }) => {
  console.log('VENDOR ITEM - vendorDetails', vendorDetails)

  return (
    <div className="border border-indigo-600">
      <h1>VENDOR ITEM</h1>
      <div>
      <h3>{vendorDetails.vendorType}</h3>
      <p>{}</p>
      </div>
    </div>
  )
}

export default VendorItem

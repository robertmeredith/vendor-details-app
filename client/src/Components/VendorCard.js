const VendorCard = ({ vendorInfo, handleVendorSelect }) => {
  return (
    <div className="border border-accent m-2 p-2 h-fit">
      <div>
        <h2>Name: {vendorInfo.name}</h2>
        <p>Instagram: {vendorInfo.instagram}</p>
      </div>
      <div>
        <p>Website: {vendorInfo.website}</p>
        <p>Email: {vendorInfo.email}</p>
      </div>
      <button
        className="btn btn-outline"
        onClick={() => handleVendorSelect(vendorInfo)}
      >
        Edit
      </button>
    </div>
  )
}

export default VendorCard

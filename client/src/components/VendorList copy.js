import VendorCard from './VendorCard'

export const VendorList = ({ filteredVendors, handleVendorSelect }) => {
  return (
    <div>
      {filteredVendors.map((vendorInfo) => {
        return (
          <VendorCard
            key={vendorInfo._id}
            vendorInfo={vendorInfo}
            handleVendorSelect={handleVendorSelect}
          />
        )
      })}
    </div>
  )
}

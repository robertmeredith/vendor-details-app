
const VendorCard = ({vendorInfo}) => {
  return (
    <div className="border border-accent m-2 p-2 h-fit">
      <h2>{vendorInfo.name}</h2>
      <h2>{vendorInfo.instagram}</h2>
      <h2>{vendorInfo.website}</h2>
      <h2>{vendorInfo.email}</h2>
    </div>
  );
};

export default VendorCard;

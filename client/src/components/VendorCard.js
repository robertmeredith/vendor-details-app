import { useNavigate } from 'react-router-dom'
import useDeleteVendor from '../hooks/useDeleteVendor'

const VendorCard = ({ vendorInfo, handleVendorSelect }) => {
  const navigate = useNavigate()

  const { mutate } = useDeleteVendor()

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
        onClick={() => navigate(`/vendors/${vendorInfo._id}`)}
      >
        Edit
      </button>
      <button className="btn btn-error" onClick={() => mutate(vendorInfo)}>
        DELETE
      </button>
    </div>
  )
}

export default VendorCard

import { useNavigate } from 'react-router-dom'
import useDeleteVendor from '../hooks/useDeleteVendor'
import { Link } from 'react-router-dom'

const VendorListCard = ({ vendorInfo, handleVendorSelect }) => {
  const navigate = useNavigate()

  const { mutate } = useDeleteVendor()

  return (
    <div className="p-4 h-fit rounded-2xl  border border-slate-100 shadow-md transition hover:border-slate-200 hover:shadow-lg bg-white">
      <div className="flex flex-col lg:flex-row  overflow-hidden min-h-[10rem]">
        {/* Left Box */}
        <div className="p-2 lg:w-2/3 ">
          <div className="flex flex-row items-center justify-between pr-4 sm:pr-8">
            {/* Vendor Name */}
            <div className="text-2xl font-semibold">{vendorInfo.name}</div>
            {/* Edit and Delete Buttons */}
            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline">Edit</button>
              <button className="btn btn-sm btn-outline btn-error">
                Delete
              </button>
            </div>
          </div>
          <hr className="mt-3 w-2/3" />
          {/* Notes */}
          <div className="hidden sm:block text-sm mt-4 pr-6">
            <span className='font-medium text-lg'>Notes: </span>{vendorInfo.notes ? vendorInfo.notes : 'Nothing added yet'}
          </div>
        </div>
        {/* Right Box */}
        {/* <div className="p-2 md:w-1/3 flex flex-col border-2 my-auto"> */}
        <div className="flex flex-col p-2 justify-center gap-1 lg:gap-3">
          {/* Contact */}
          <div>{vendorInfo.instagram}</div>
          <div>{vendorInfo.email}</div>
          <Link to={vendorInfo.website}>{vendorInfo.website}</Link>
        </div>
      </div>
    </div>
  )
}

export default VendorListCard

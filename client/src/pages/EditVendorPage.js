import EditVendorForm from '../components/EditVendorForm'
import { useParams } from 'react-router-dom'
import useGetVendor from '../hooks/useGetVendor'
import SectionHeading from '../components/SectionHeading'
import Skeleton from '../components/Skeleton'

const text =
  'Update vendor details and leave notes that may prove useful in the future'

const EditVendorPage = () => {
  const { vendorId } = useParams()
  const { data, isLoading } = useGetVendor(vendorId)

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 min-w-[20rem]">
      <SectionHeading
        text={text}
        section={`Edit Vendor ${data ? ` • ${data.vendor.name}` : ''}`}
      />
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="mx-auto max-w-3xl">
          <EditVendorForm vendorToEdit={data.vendor} />
        </div>
      )}
    </div>
  )
}

export default EditVendorPage

import AddVendorForm from '../Components/AddVendorForm'
import SectionHeading from '../components/SectionHeading'

const text = 'Enter vendor details below to add the vendor to your database'

const AddVendorPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 min-w-[20rem]">
      <SectionHeading text={text} section="Add New Vendor" />
      <div className="mx-auto max-w-3xl">
        <AddVendorForm />
      </div>
    </div>
  )
}

export default AddVendorPage

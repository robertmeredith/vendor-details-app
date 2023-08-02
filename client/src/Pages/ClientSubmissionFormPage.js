import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import vendorService from '../services/vendorService'
import Datepicker from 'react-tailwindcss-datepicker'
import useCreateSubmission from '../hooks/useCreateSubmission'
import SectionHeading from '../Components/SectionHeading'
import ClientSubmissionForm from '../Components/ClientSubmissionForm'

const text = 'Please fill out the form with the vendor details for your event'

const ClientSubmissionFormPage = () => {
  const { userId } = useParams()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 min-w-[20rem]">
      <SectionHeading text={text} section="Vendor Details form" />
      <div className="mx-auto max-w-7xl">
        <ClientSubmissionForm userId={userId} />
      </div>
    </div>
  )
}

export default ClientSubmissionFormPage

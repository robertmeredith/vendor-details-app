import { useParams } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ClientSubmissionForm from '../components/ClientSubmissionForm'

const text = 'Please fill out the form with the vendor details for your event'

const ClientSubmissionFormPage = () => {
  const params = useParams()
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

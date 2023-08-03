import { useParams } from 'react-router-dom'
import SubmissionItem from '../components/SubmissionItem'
import useGetSubmission from '../hooks/useGetSubmission'

const SubmissionPage = () => {
  const { submissionId } = useParams()
  const { data, isLoading, isError, error } = useGetSubmission(submissionId)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>{error.message}</p>

  console.log(data)

  return (
    <>
      {/* Card Section */}
      <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200 text-center">
          {`${data.client} & ${data.partner}`}
        </h1>
        <h2 className="text-center pt-3">{data.eventDate}</h2>
      </div>
      <SubmissionItem submission={data} />
      {/* End Card Section */}
    </>

    
  )
}

export default SubmissionPage

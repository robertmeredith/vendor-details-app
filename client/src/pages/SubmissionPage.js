import { useParams } from 'react-router-dom'
import SubmissionItem from '../components/SubmissionItem'
import useGetSubmission from '../hooks/useGetSubmission'

const SubmissionPage = () => {
  const { submissionId } = useParams()
  const { data, isLoading, isError, error } = useGetSubmission(submissionId)

  return (
    <>
      {/* Card Section */}
      <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200 text-center">
          {!isLoading && `${data.client} & ${data.partner}`}
        </h1>
        <h2 className="text-center pt-3">{data.eventDate}</h2>
      </div>
      {isLoading ? (
        <div className="h-60 flex justify-center items-center text-slate-400">
          <h2>Loading client form submission...</h2>
        </div>
      ) : isError ? (
        <div className="h-60 flex justify-center items-center text-slate-400">
          <h2>There was an error...</h2>
        </div>
      ) : (
        <SubmissionItem submission={data} />
      )}
      {/* End Card Section */}
    </>
  )
}

export default SubmissionPage

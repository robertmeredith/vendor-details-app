import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SubmissionItem from '../components/SubmissionItem'

const fetchSubmission = async ({ queryKey }) => {
  const submissionId = queryKey[1]
  const { data } = await axios.get(`/api/v1/submissions/${submissionId}`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmYzRjNmQ2OWRiZWIzYjQzYzYyZTgiLCJpYXQiOjE2ODA3MzQwNDcsImV4cCI6MTY4MTMzODg0N30.h_dLANw03iGcMnHXAmIrOBvKFuP1GAxd1GmVapPhc-w',
    },
  })
  return data.submission
}

const Submission = () => {
  const { submissionId } = useParams()

  const getSubmissionQuery = useQuery({
    queryKey: ['submissions', submissionId],
    queryFn: fetchSubmission,
  })

  if (getSubmissionQuery.isLoading) return <p>Loading...</p>
  if (getSubmissionQuery.isError)
    return <p>{getSubmissionQuery.error.message}</p>

  return (
    <div>
      <h1 className="text-3xl text-center">Submission Page</h1>
      <SubmissionItem submission={getSubmissionQuery.data} />
    </div>
  )
}

export default Submission

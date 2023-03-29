import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SubmissionItem from '../Components/SubmissionItem'

const Submissions = () => {
  const [submissions, setSubmissions] = useState(undefined)
  console.log('SUBMISSIONS', submissions)

  useEffect(() => {
    axios
      .get('/submissions')
      .then((response) => {
        console.log(response.data)
        setSubmissions(response.data.submissions)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h1 className="text-3xl text-center">Submissions</h1>
      {!submissions ? (
        <div>Loading</div>
      ) : (
        submissions.map((submission) => {
          return <SubmissionItem submission={submission} />
        })
      )}
    </div>
  )
}

export default Submissions

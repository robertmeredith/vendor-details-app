import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SubmissionListItem from '../components/SubmissionListItem'
import { useQuery } from '@tanstack/react-query'
import Loading from '../components/Loading'

const fetchAllUserSubmissions = async () => {
  // NEEDS CHANGING TO USER SUBMISSIONS - CURRENTLY FETCHING ALL
  const { data } = await axios.get('/api/v1/submissions')
  return data
}

const Submissions = () => {
  const userSubmissionsQuery = useQuery(
    ['submissions'],
    fetchAllUserSubmissions
  )

  if (userSubmissionsQuery.isLoading) return <Loading />
  if (userSubmissionsQuery.isError) return <p>Error</p>

  console.log('SUBMISSIONS PAGE - submissions', userSubmissionsQuery.data)

  return (
    <div>
      <h1 className="text-3xl text-center">Submissions Page</h1>
      {userSubmissionsQuery.data.submissions.map((submission) => {
        return <SubmissionListItem key={submission._id} submission={submission} />
      })}
    </div>
  )
}

export default Submissions

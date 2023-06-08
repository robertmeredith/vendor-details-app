import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SubmissionListItem from '../components/SubmissionListItem'
import { useQuery } from '@tanstack/react-query'
import Loading from '../components/Loading'
import useSubmissions from '../hooks/useSubmissions'

const Submissions = () => {
  const { data, isLoading, isError } = useSubmissions()

  if (isLoading) return <Loading />
  if (isError) return <p>Error</p>

  return (
    <div>
      <h1 className="text-3xl text-center">Submissions Page</h1>
      <p>{data.count}</p>
      {data.submissions.map((submission) => {
        return (
          <SubmissionListItem key={submission._id} submission={submission} />
        )
      })}
    </div>
  )
}

export default Submissions

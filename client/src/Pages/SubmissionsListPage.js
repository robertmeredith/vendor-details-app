import React from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Loading from '../components/Loading'
import useGetAllSubmissions from '../hooks/useSubmissions'
import { useState } from 'react'
import SubmissionTable from '../components/SubmissionTable'

const text = 'View your client form submissions here'

const SubmissionsListPage = () => {
  const { data, isLoading, isError } = useGetAllSubmissions()
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()

  if (isLoading) return <Loading />
  if (isError) return <p>There was an error fetching the records</p>

  // FILTER VENDORS WHEN SEARCHING - includes both name and website
  const filteredSubmissions = data?.submissions?.filter(
    (submission) =>
      submission.client.toLowerCase().includes(filter.toLowerCase()) ||
      submission.partner.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <SectionHeading text={text} section="Client Submissions" />
      <div className="mx-auto max-w-7xl">
        <div className="mt-6 flex gap-6 items-center">
          <div className="max-w-20">
            {/* TODO: Add Client filter */}
            <label htmlFor="filter" className="sr-only">
              Filter entries
            </label>
            <input
              type="text"
              name="filter"
              id="filter"
              value={filter}
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6"
              placeholder="Filter entries"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <SubmissionTable submissions={filteredSubmissions} />
      </div>
    </div>
  )
}

export default SubmissionsListPage

import React from 'react'
import SectionHeading from '../components/SectionHeading'
import Loading from '../components/Loading'
import useGetAllSubmissions from '../hooks/useSubmissions'
import { useState } from 'react'
import SubmissionTable from '../components/SubmissionTable'
import useUser from '../hooks/useUser'
import { toast } from 'react-toastify'

const text = 'View your client form submissions here'

const SubmissionsListPage = () => {
  const { data, isLoading, isError } = useGetAllSubmissions()
  const [filter, setFilter] = useState('')
  const user = useUser()

  // FILTER VENDORS WHEN SEARCHING - includes both name and website
  const filteredSubmissions = data?.submissions?.filter(
    (submission) =>
      submission.client.toLowerCase().includes(filter.toLowerCase()) ||
      submission.partner.toLowerCase().includes(filter.toLowerCase())
  )

  const copyToClipboard = () => {
    const currentPath = window.location.href
    const siteUrl = currentPath.split('/submissions')[0]
    navigator.clipboard.writeText(`${siteUrl}/user/${user.details.id}/form`)
    toast('Client form address copied to clipboard')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <SectionHeading text={text} section="Client Submissions" />
      <div className="mx-auto max-w-7xl">
        <div className="mt-6 flex gap-6 items-center">
          {data.submissions.length !== 0 && (
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
          )}
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-md bg-cyan-50 px-2.5 py-1.5 text-md font-semibold text-cyan-600 shadow-sm hover:bg-cyan-100"
          >
            Send Form to Client
          </button>
        </div>

        {isLoading ? (
          <div className="h-60 flex justify-center items-center text-slate-400">
            <h2>Loading client form submissions...</h2>
          </div>
        ) : isError ? (
          <div className="h-60 flex justify-center items-center text-slate-400">
            <h2>There was an error...</h2>
          </div>
        ) : data.submissions.length === 0 ? (
          <div className="h-60 flex justify-center items-center text-slate-400">
            <h2>
              No form records in the database. Once you have some form
              submissions from clients they will appear here.
            </h2>
          </div>
        ) : (
          <SubmissionTable submissions={filteredSubmissions} />
        )}
      </div>
    </div>
  )
}

export default SubmissionsListPage

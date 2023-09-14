import { useParams } from 'react-router-dom'
import useGetSubmission from '../hooks/useGetSubmission'
import SectionHeading from '../components/SectionHeading'
import SingleSubmissionTable from '../components/SingleSubmissionTable'

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SingleSubmissionPage = () => {
  // Toggle including vendor type in copy for Instagram
  const [includeVendorType, setIncludeVendorType] = useState(false)
  const { submissionId } = useParams()
  const { data, isLoading, isError, error } = useGetSubmission(submissionId)

  // Copy for Instagram
  const copyForInstagram = () => {
    const instaList = includeVendorType
      ? data.vendors
          .map((item) => `${item.vendorType} - @${item.vendor.instagram}`)
          .join('\n')
      : data.vendors.map((item) => `@${item.vendor.instagram}`).join('\n')
    navigator.clipboard.writeText(instaList)
    toast.success('Copied to clipboard!')
  }

  // Copy for Email
  const copyForEmail = () => {
    const emailList = data.vendors.map((item) => item.vendor.email).join(', ')
    navigator.clipboard.writeText(emailList)
    toast.success('Copied to clipboard!')
  }

  if (isLoading)
    return (
      <div className="h-60 flex justify-center items-center text-slate-400">
        <h2>Loading...</h2>
      </div>
    )
  if (isError) return (
    <div className="h-60 flex justify-center items-center text-slate-400">
      <h2>There was an error</h2>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 mb-14">
      <SectionHeading
        text={dayjs(data.eventDate).format('DD MMMM YYYY')}
        section={`${data.client} & ${data.partner}`}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mt-6 flex gap-6 items-center">
          <div className="flex flex-auto justify-between">
            <div className="flex gap-x-6 items-center">
              <button
                type="button"
                className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={copyForInstagram}
              >
                Copy for Instagram
              </button>
              <Switch.Group as="div" className="flex items-center">
                <Switch
                  checked={includeVendorType}
                  onChange={setIncludeVendorType}
                  className={classNames(
                    includeVendorType ? 'bg-indigo-200' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      includeVendorType ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3 text-sm">
                  <span className="font-normal text-gray-900">
                    Include vendor type
                  </span>{' '}
                </Switch.Label>
              </Switch.Group>
            </div>
            <button
              type="button"
              className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              onClick={copyForEmail}
            >
              Copy Email List
            </button>
          </div>
        </div>
        <SingleSubmissionTable submission={data} />
      </div>
    </div>
  )
}

export default SingleSubmissionPage

// <div>
//   <h1 className="text-3xl text-center">Submission Page</h1>
//   <SubmissionItem submission={data} />
//   <button className='btn btn-error mt-5'>Delete</button>
// </div>

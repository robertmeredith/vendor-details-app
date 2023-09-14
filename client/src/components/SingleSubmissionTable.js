import useGetUserSettings from '../hooks/useGetUserSettings'
import SingleSubmissionTableRow from './SingleSubmissionTableRow'
import useUser from '../hooks/useUser'
import { v4 as uuid } from 'uuid'

const SingleSubmissionTable = ({ submission }) => {
  const user = useUser()
  const { data: userSettings, isLoading } = useGetUserSettings(user.details.id)

  const flattenVendor = (entry) => {
    return {
      vendorType: entry.vendorType,
      ...entry.vendor,
    }
  }

  if (isLoading) {
    return (
      <div className="h-60 flex justify-center items-center text-slate-400">
        <h2>Loading...</h2>
      </div>
    )
  }

  console.log(userSettings)

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-indigo-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Vendor
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Instagram
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Website
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Include User Details Row */}
                {userSettings.userBusiness.includeOnForm && (
                  <SingleSubmissionTableRow
                    vendorDetails={userSettings.userBusiness}
                    vendorUrl={`/settings`}
                  />
                )}
                {submission.vendors.map((vendor) => (
                  <SingleSubmissionTableRow
                    // TODO: Add a key here as a vendor can appear more than once in the listings
                    key={uuid()}
                    vendorDetails={flattenVendor(vendor)}
                    vendorUrl={`/vendors/${vendor.vendor._id}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleSubmissionTable

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const SubmissionTableRow = ({ entry }) => {
  const { client, partner, eventDate, _id, email, vendors } = entry
  const venue = vendors.find((v) => v.vendorType.toLowerCase() === 'venue')

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {client}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {partner}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    {venue ? venue.vendor.name : 'N/A'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {eventDate ? dayjs(eventDate).format('MMM DD YYYY') : 'N/A' }
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/submissions/${_id}`}
          className="text-cyan-600 hover:text-cyan-900"
        >
          View
          {/* <span className="sr-only">, {person.name}</span> */}
        </Link>
      </td>
    </tr>
  )
}

export default SubmissionTableRow

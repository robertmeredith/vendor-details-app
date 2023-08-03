import { Link } from 'react-router-dom'

const SingleSubmissionTableRow = ({ vendorDetails, vendorUrl }) => {
  console.log(vendorDetails)

  const { vendorType, name, instagram, website, email } = vendorDetails

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {vendorType}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {`@${instagram}`}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {website}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {email}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={vendorUrl}
          className="text-indigo-600 hover:text-indigo-900"
        >
          View
          {/* <span className="sr-only">, {person.name}</span> */}
        </Link>
      </td>
    </tr>
  )
}

export default SingleSubmissionTableRow

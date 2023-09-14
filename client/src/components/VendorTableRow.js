import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const VendorTableRow = ({ vendor }) => {
  const copyToClipboard = (e) => {
    navigator.clipboard
      .writeText(e.target.textContent)
      .then(() => {
        // Success
        toast(`${e.target.dataset.name} copied to clipboard`, 1)
      })
      .catch((err) => {
        // Error
        toast.error('Could not copy text: ', err)
      })
  }

  return (
    <tr className="hover:shadow-sm hover:bg-slate-50">
      <td>
      <span
        data-name="Name"
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 cursor-pointer"
        onClick={copyToClipboard}
      >
        {vendor.name}
      </span>
      </td>
      <td>

      <span
        data-name="Instagram"
        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
        onClick={copyToClipboard}
        >
        {vendor.instagram}
      </span>
        </td>
        <td>

      <span
        data-name="Email"
        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
        onClick={copyToClipboard}
        >
        {vendor.email}
      </span>
        </td>
        <td>
          
      <span
        data-name="Website"
        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
        onClick={copyToClipboard}
        >
        {vendor.website}
      </span>
        </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/vendors/${vendor._id}`}
          className="text-emerald-600 hover:text-emerald-900"
        >
          View
          {/* <span className="sr-only">, {person.name}</span> */}
        </Link>
      </td>
    </tr>
  )
}

export default VendorTableRow

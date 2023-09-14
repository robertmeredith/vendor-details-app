import React, { useState } from 'react'
import { VendorTable } from '../components/VendorTable'
import useGetAllVendors from '../hooks/useGetAllVendors'
import { useNavigate } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const text = 'Search through vendors here'

const VendorsListPage = () => {
  const [filter, setFilter] = useState('')

  const { data } = useGetAllVendors()
  const navigate = useNavigate()

  // FILTER VENDORS WHEN SEARCHING - includes both name and website
  const filteredVendors = data.vendors.filter(
    (vendor) =>
      vendor.website.toLowerCase().includes(filter.toLowerCase()) ||
      vendor.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <SectionHeading text={text} section="Vendors" />
      {/* Filter Menu Section */}
      <div className="mx-auto max-w-7xl">
        {/* Filter Input */}
        <div className="mt-6 flex gap-6 items-center">
          {data.vendors.length !== 0 && 
          <div className="max-w-20">
            <label htmlFor="filter" className="sr-only">
              Filter Vendors
            </label>
            <input
              type="text"
              name="filter"
              id="filter"
              value={filter}
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 text-sm sm:leading-6"
              placeholder="Filter entries"
              onChange={(e) => setFilter(e.target.value)}
              />
          </div>
            }
          <button
            type="button"
            onClick={() => navigate('/vendors/new')}
            className="rounded-md bg-green-50 px-2.5 py-1.5 text-md font-semibold text-green-600 shadow-sm hover:bg-green-100"
          >
            Add New Vendor
          </button>
        </div>
        {data.vendors.length === 0 ? (
          <div className='h-60 flex justify-center items-center text-slate-400'>
            <h2>No Vendor records in the database.  Go add some vendors by clicking the button above!</h2>
          </div>
        ) : (
          <VendorTable filteredVendors={filteredVendors} />
        )}
      </div>
    </div>
  )
}
export default VendorsListPage

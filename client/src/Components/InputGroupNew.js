import InputGroupCustomInput from './InputGroupCustomInput'
import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import InputGroupInputWithInline from './InputGroupInputWithInline'
import InputGroupSelect from './InputGroupSelect'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { formatInstagramUsername, formatUrl } from '../helpers/validationHelper'

// DON'T DELETE THIS
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const InputGroupNew = ({
  defaultVendorTypes,
  index,
  setFieldValue,
  allVendors,
  formRowValues,
  removeRow,
  values,
}) => {
  const [filteredVendors, setFilteredVendors] = useState(allVendors)

  // COMBOBOX EXAMPLE
  const [query, setQuery] = useState('')
  const [selectedVendor, setSelectedVendor] = useState(null)

  // const filteredPeople =
  //   query === ''
  //     ? people
  //     : people.filter((person) => {
  //         return person.name.toLowerCase().includes(query.toLowerCase())
  //       })

  // TODO: Tidy this up - more efficient way to do this?
  // Handle change of name field
  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value)
    // If field is 'name' and value is not empty then filter vendors
    if (
      event.target.name === `vendors[${index}].vendor.name` &&
      event.target.value
    ) {
      setFilteredVendors(
        allVendors.filter((v) =>
          v.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      )
      // else set filtered vendors to all vendors
    } else {
      setFilteredVendors(allVendors)
    }
  }

  return (
    <div className="flex gap-4 md:gap-2 md:items-center">
      {/* VENDOR TYPE DIV */}
      <div>
        {/* VENDOR TYPE */}
        <InputGroupSelect
          name={`vendors[${index}].vendorType`}
          options={defaultVendorTypes}
          defaultValue={formRowValues.vendorType}
          handleChange={(e) =>
            setFieldValue(`vendors[${index}].vendorType`, e.target.value)
          }
        />
      </div>
      {/* VENDOR NAME */}
      {/* INPUTS DIV */}
      <div className="lg:flex flex-grow gap-x-2 gap-y-4 grid md:grid-cols-2">
        {/* NAME SELECT AUTOFILL */}
        <Combobox
          className="relative"
          as="div"
          value={formRowValues.vendor.name}
          onChange={(vendor) => {
            setFieldValue(`vendors[${index}].vendor`, vendor)
          }}
        >
          <div className="relative">
            <Combobox.Label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vendor Name
            </Combobox.Label>
            <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-2 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              // onChange={(event) => setQuery(event.target.value)}
              onChange={handleChange}
              name={`vendors[${index}].vendor.name`}
              displayValue={formRowValues.vendor.name}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredVendors.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredVendors.map((vendor) => (
                  <Combobox.Option
                    key={vendor._id}
                    value={vendor}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            'block truncate',
                            selected && 'font-semibold'
                          )}
                        >
                          {vendor.name}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>

        {/* VENDOR INSTAGRAM */}
        <InputGroupInputWithInline
          name={`vendors[${index}].vendor.instagram`}
          id={`vendors[${index}].vendor.instagram`}
          labelText="Instagram"
          addon="@"
          onChange={(e) =>
            setFieldValue(`vendors[${index}].vendor.instagram`, e.target.value)
          }
          onBlur={(e) =>
            setFieldValue(
              `vendors[${index}].vendor.instagram`,
              formatInstagramUsername(e.target.value)
            )
          }
        />
        {/* VENDOR WEBSITE*/}
        <InputGroupCustomInput
          name={`vendors[${index}].vendor.website`}
          id={`vendors[${index}].vendor.website`}
          labelText="Website"
          onChange={(e) =>
            setFieldValue(`vendors[${index}].vendor.website`, e.target.value)
          }
          onBlur={(e) => {
            const formatted = formatUrl(e.target.value)
            // set the formatted value
            setFieldValue(`vendors[${index}].vendor.website`, formatted)
          }}
        />
        {/* VENDOR EMAIL */}
        <InputGroupCustomInput
          name={`vendors[${index}].vendor.email`}
          id={`vendors[${index}].vendor.email`}
          labelText="Email"
          onChange={(e) =>
            setFieldValue(`vendors[${index}].vendor.email`, e.target.value)
          }
        />
      </div>
      {/* DELETE ROW BUTTON */}
      <div className="flex items-center">
        <button
          type="button"
          className="rounded-md ml-1 bg-white p-0.5 text-gray-900 outline outline-gray-300 hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition"
          onClick={removeRow}
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

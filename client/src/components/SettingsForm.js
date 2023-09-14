import { UserCircleIcon } from '@heroicons/react/24/solid'
import { formatInstagramUsername, formatUrl } from '../helpers/validationHelper'

import { Switch } from '@headlessui/react'
import useUser from '../hooks/useUser'
import useGetUserSettings from '../hooks/useGetUserSettings'
import { Formik, Form, Field } from 'formik'
import { useEffect } from 'react'

import { appDefaultVendorTypes } from '../helpers/defaultFormHelper'
import { useState } from 'react'
import useUpdateSettings from '../hooks/useUpdateSettings'
import Badge from './Badge.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SettingsForm = () => {
  const user = useUser()

  // GET USER SETTINGS
  const getUserSettings = useGetUserSettings(user.details.id)

  useEffect(() => {
    if (getUserSettings.data) {
      setFilteredVendorTypes(getUserSettings.data.defaultVendorTypes)
      setIncludeOnForm(getUserSettings.data.userBusiness.includeOnForm)
    }
  }, [getUserSettings.data])

  const [includeOnForm, setIncludeOnForm] = useState(false)
  const [filteredVendorTypes, setFilteredVendorTypes] = useState([])
  const [customVendorType, setCustomVendorType] = useState('')

  // UPDATE SETTINGS MUTATION
  const { mutate: updateSettings } = useUpdateSettings()

  // IF LOADING - SHOW LOADING
  if (getUserSettings.isLoading) return <div>Loading...</div>

  const initialFormState = { ...getUserSettings.data }

  // SUBMIT SETTINGS UPDATE MUTATION

  // TODO: Refactor this to account for dealing with different cases, lower / upper etc
  const addCustomVendorType = () => {
    const newVendorTypes = customVendorType
      .split(',')
      .map((type) => type.trim())
      .filter((type) => type !== '')
    setFilteredVendorTypes((prev) => [
      ...filteredVendorTypes,
      ...newVendorTypes.filter((type) => !prev.includes(type)),
    ])
    setCustomVendorType('')
  }

  // Add Vendor Type to List
  const addVendorType = (type) => {
    return setFilteredVendorTypes((prev) => [...prev, type])
  }

  // Remove Vendor Type from List
  const removeVendorType = (type) => {
    return setFilteredVendorTypes((prev) => prev.filter((t) => t !== type))
  }

  // Filter Default Vendor Types by excluding vendors already in the users list
  const filteredDefaultVendors = appDefaultVendorTypes.filter((type) => {
    return !filteredVendorTypes
      .map((t) => t.toLowerCase())
      .includes(type.toLowerCase())
  })

  // Submit Form
  const handleSubmit = (values) => {
    const formData = { ...values }
    formData.defaultVendorTypes = filteredVendorTypes
    formData.userBusiness.includeOnForm = includeOnForm
    updateSettings(formData)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialFormState}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props, fields) => (
        <Form className="pb-20">
          <div className="space-y-12 sm:space-y-16">
            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-8">
              {/* INCLUDE USER DETAILS SWITCH */}
              <Switch.Group
                as="div"
                className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                {/* <Switch.Group as="div" className="flex items-center justify-between"> */}

                <span className="flex flex-grow flex-col col-span-2 md:col-span-1">
                  <Switch.Label
                    as="span"
                    className="text-sm font-medium leading-6 text-gray-900"
                    passive
                  >
                    Include own business
                  </Switch.Label>
                  <Switch.Description
                    as="span"
                    className="text-sm text-gray-500"
                  >
                    First line of client form will default to details below
                  </Switch.Description>
                </span>

                <div className="md:col-span-2 h-full flex items-center mt-4 sm:mt-0">
                  <Switch
                    checked={includeOnForm}
                    onChange={() => setIncludeOnForm(!includeOnForm)}
                    className={classNames(
                      includeOnForm ? 'bg-indigo-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        includeOnForm ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
              </Switch.Group>

              {/* BUSINESS TYPE */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="userBusiness.vendorType"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Type of business
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Field
                    autoComplete="off"
                    type="text"
                    name="userBusiness.vendorType"
                    id="userBusiness.vendorType"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* BUSINESS NAME */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="business-name"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Business name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Field
                    autoComplete="off"
                    type="text"
                    name="userBusiness.name"
                    id="userBusiness.name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* INSTAGRAM */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Instagram
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      instagram.com/
                    </span>
                    <Field
                      autoComplete="off"
                      type="text"
                      name="userBusiness.instagram"
                      id="userBusiness.instagram"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                      onBlur={(e) =>
                        props.setFieldValue(
                          'userBusiness.instagram',
                          formatInstagramUsername(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Email address
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Field
                    id="userBusiness.email"
                    name="userBusiness.email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* WEBSITE */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Website
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      https://www.
                    </span>
                    <Field
                      autoComplete="off"
                      type="text"
                      name="userBusiness.website"
                      id="userBusiness.website"
                      onBlur={(e) =>
                        props.setFieldValue(
                          'userBusiness.website',
                          formatUrl(e.target.value)
                        )
                      }
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith.com"
                    />
                  </div>
                </div>
              </div>

              {/* VENDOR TYPES */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-8 ">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Vendor types
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[6rem] break-normal p-1.5">
                    {filteredVendorTypes.map((type) => {
                      return (
                        // <div
                        //   key={type}
                        //   className="inline-block grow-1 rounded-full bg-indigo-500 pl-2 pr-1.5 py-0.5 text-xs text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 transition"
                        // >
                        //   <div className="flex flex-row items-center">
                        //     <span className="">{type} </span>
                        //     <div
                        //       className="font-bold pl-1 hover:cursor-pointer"
                        //       onClick={() => removeVendorType(type)}
                        //     >
                        //       <XMarkIcon
                        //         className="h-3 w-3 hover:scale-125 stroke-1 hover:stroke-2"
                        //         aria-hidden="true"
                        //       />
                        //     </div>
                        //   </div>
                        // </div>
                        <Badge
                          key={type}
                          handleClick={() => removeVendorType(type)}
                          text={type}
                        />
                      )
                    })}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600 max-w-2xl ">
                    Select vendor types to include on your form using the default list below and/or add
                    your own
                  </p>
                  <div className="w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[6rem] break-normal p-1.5 mt-3">
                    {filteredDefaultVendors.map((type) => {
                      return (
                        <div
                          key={type}
                          className="inline-block grow-1 rounded-full bg-indigo-500 px-2 py-0.5 text-xs text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 transition hover:cursor-pointer"
                          onClick={() => addVendorType(type)}
                          // onClick={() =>
                          //   props.setFieldValue('defaultVendorTypes', [
                          //     ...props.values.defaultVendorTypes,
                          //     type,
                          //   ])
                          // }
                        >
                          <div className="flex flex-row items-center">
                            <span className="">{type} </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-6  flex gap-4 items-center">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5 sr-only"
                    >
                      Add vendor type
                    </label>
                    <div className="sm:mt-0">
                      <input
                        type="text"
                        name="vendor-type"
                        id="vendor-type"
                        value={customVendorType}
                        autoComplete="off"
                        onChange={(e) => setCustomVendorType(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      />
                    </div>
                    <button
                      disabled={customVendorType === ''}
                      type="button"
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 transition "
                      onClick={addCustomVendorType}
                    >
                      Add vendor type
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>

    // <form className="pb-28">
    //   <div className="space-y-12 sm:space-y-16">
    //     <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:pb-8">
    //       {/* INCLUDE USER DETAILS SWITCH */}
    //       <Switch.Group
    //         as="div"
    //         className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
    //       >
    //         {/* <Switch.Group as="div" className="flex items-center justify-between"> */}

    //         <span className="flex flex-grow flex-col col-span-2 md:col-span-1">
    //           <Switch.Label
    //             as="span"
    //             className="text-sm font-medium leading-6 text-gray-900"
    //             passive
    //           >
    //             Include own business
    //           </Switch.Label>
    //           <Switch.Description as="span" className="text-sm text-gray-500">
    //             First line of client form will default to details below
    //           </Switch.Description>
    //         </span>

    //         <div className="md:col-span-2 h-full flex items-center mt-4 sm:mt-0">
    //           <Switch
    //             checked={includeOnForm}
    //             onChange={() => setIncludeOnForm(!includeOnForm)}
    //             className={classNames(
    //               includeOnForm ? 'bg-indigo-600' : 'bg-gray-200',
    //               'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
    //             )}
    //           >
    //             <span
    //               aria-hidden="true"
    //               className={classNames(
    //                 includeOnForm ? 'translate-x-5' : 'translate-x-0',
    //                 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
    //               )}
    //             />
    //           </Switch>
    //         </div>
    //       </Switch.Group>

    //       {/* BUSINESS TYPE */}
    //       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
    //         <label
    //           htmlFor="business-name"
    //           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    //         >
    //           Type of business
    //         </label>
    //         <div className="mt-2 sm:col-span-2 sm:mt-0">
    //           <input
    //             autoComplete="off"
    //             type="text"
    //             name="business-name"
    //             id="business-name"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>
    //       {/* BUSINESS NAME */}
    //       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
    //         <label
    //           htmlFor="business-name"
    //           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    //         >
    //           Business name
    //         </label>
    //         <div className="mt-2 sm:col-span-2 sm:mt-0">
    //           <input
    //             autoComplete="off"
    //             type="text"
    //             name="business-name"
    //             id="business-name"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       {/* INSTAGRAM */}
    //       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
    //         <label
    //           htmlFor="instagram"
    //           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    //         >
    //           Instagram
    //         </label>
    //         <div className="mt-2 sm:col-span-2 sm:mt-0">
    //           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
    //             <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
    //               instagram.com/
    //             </span>
    //             <input
    //               autoComplete="off"
    //               type="text"
    //               name="instagram"
    //               id="instagram"
    //               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
    //               placeholder="janesmith"
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       {/* EMAIL ADDRESS */}
    //       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    //         >
    //           Email address
    //         </label>
    //         <div className="mt-2 sm:col-span-2 sm:mt-0">
    //           <input
    //             id="email"
    //             name="email"
    //             type="email"
    //             autoComplete="email"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       {/* WEBSITE */}
    //       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
    //         <label
    //           htmlFor="website"
    //           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    //         >
    //           Website
    //         </label>
    //         <div className="mt-2 sm:col-span-2 sm:mt-0">
    //           <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
    //             <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
    //               https://www.
    //             </span>
    //             <input
    //               autoComplete="off"
    //               type="text"
    //               name="website"
    //               id="website"
    //               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
    //               placeholder="janesmith.com"
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       {/* VENDOR TYPES */}
    //       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-8">
    //         <label
    //           htmlFor="about"
    //           className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    //         >
    //           Vendor types
    //         </label>
    //         <div className="mt-2 sm:col-span-2 sm:mt-0">
    //           <div className="w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[6rem] break-normal p-1.5">
    //             {filteredVendorTypes.map((type) => {
    //               return (
    //                 <div
    //                   key={type}
    //                   className="inline-block grow-1 rounded-full bg-indigo-500 pl-2 pr-1.5 py-0.5 text-xs text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 transition"
    //                 >
    //                   <div className="flex flex-row items-center">
    //                     <span className="">{type} </span>
    //                     <div
    //                       className="font-bold pl-1 hover:cursor-pointer"
    //                       onClick={() => removeVendorType(type)}
    //                     >
    //                       <XMarkIcon
    //                         className="h-3 w-3 hover:scale-125 stroke-1 hover:stroke-2"
    //                         aria-hidden="true"
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>
    //               )
    //             })}
    //           </div>
    //           <p className="mt-3 text-sm leading-6 text-gray-600 max-w-2xl ">
    //             Select vendor types from the default list below and/or add your
    //             own
    //           </p>
    //           <div className="w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[6rem] break-normal p-1.5 mt-3">
    //             {filteredVendors?.map((type) => {
    //               return (
    //                 <div
    //                   key={type}
    //                   className="inline-block grow-1 rounded-full bg-indigo-500 px-2 py-0.5 text-xs text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 transition hover:cursor-pointer"
    //                   onClick={() => addVendorType(type)}
    //                 >
    //                   <div className="flex flex-row items-center">
    //                     <span className="">{type} </span>
    //                   </div>
    //                 </div>
    //               )
    //             })}
    //           </div>
    //           <div className="mt-6  flex gap-4 items-center">
    //             <label
    //               htmlFor="first-name"
    //               className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5 sr-only"
    //             >
    //               Add vendor
    //             </label>
    //             <div className="sm:mt-0">
    //               <input
    //                 type="text"
    //                 name="vendor-type"
    //                 id="vendor-type"
    //                 value={customVendorType}
    //                 autoComplete="off"
    //                 onChange={(e) => setCustomVendorType(e.target.value)}
    //                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //               />
    //             </div>
    //             <button
    //               disabled={customVendorType === ''}
    //               type="button"
    //               className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 transition "
    //               onClick={addCustomVendorType}
    //             >
    //               Add vendor
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-6 flex items-center justify-end gap-x-6">
    //     <button
    //       type="button"
    //       className="text-sm font-semibold leading-6 text-gray-900"
    //     >
    //       Cancel
    //     </button>
    //     <button
    //       type="submit"
    //       className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //     >
    //       Save
    //     </button>
    //   </div>
    // </form>
  )
}

export default SettingsForm

import { useState } from 'react'

const InputGroupSelect = ({
  handleChange,
  options,
  name,
  defaultValue,
  disabled,
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue)

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900 z-10"
      >
        Vendor
      </label>
      <select
        id={name}
        name={name}
        className={`block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-[11rem] ${disabled && 'bg-none'} ${
          currentValue === 'select' && 'ring-2 ring-emerald-500'
        }`}
        defaultValue={defaultValue}
        onChange={(e) => {
          // setCurrentValue(e.target.value)
          handleChange(e)
        }}
        disabled={disabled}
      >
        <option disabled value="select">
          Please select
        </option>
        {options.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default InputGroupSelect

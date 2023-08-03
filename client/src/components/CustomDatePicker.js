import Datepicker from 'react-tailwindcss-datepicker'

const CustomDatePicker = ({ labelText, name, handleChange, value }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelText || name}
      </label>
      <div className="mt-2">
        <Datepicker
          name={name}
          id={name}
          inputClassName="relative w-full rounded-md border-0 py-1.5 sm:text-sm sm:leading-6 ring-1 ring-inset focus:ring-2 focus:ring-inset  text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600"
          useRange={false}
          asSingle={true}
          value={value}
          startWeekOn="mon"
          readOnly={true}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  )
}

export default CustomDatePicker

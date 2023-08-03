import { useField } from 'formik'

const InputGroupCustomInput = ({ labelText, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="relative grow">
      <label
        htmlFor={labelText}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >
        {labelText || props.name}
      </label>
      <input
        {...field}
        {...props}
        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  )
}

export default InputGroupCustomInput

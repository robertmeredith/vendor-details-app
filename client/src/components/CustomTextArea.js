import { useField, ErrorMessage } from 'formik'

const CustomTextArea = ({ labelText, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="col-span-full">
      {/* LABEL */}
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelText || props.name}
      </label>
      {/* TEXT AREA */}
      <div className='mt-2'>
        <textarea
          rows={3}
          {...field}
          {...props}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></textarea>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        {props.description}
      </p>
      <div className="min-h-6">
        <ErrorMessage
          name={props.name}
          component="div"
          className={`text-xs font-semibold mt-2 ml-1`}
        />
      </div>
    </div>
  )
}

export default CustomTextArea

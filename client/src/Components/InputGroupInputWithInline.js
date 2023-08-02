import { useField } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const InputGroupInputWithInline = ({ labelText, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="relative grow">
      <label
        htmlFor={labelText}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >
        {labelText || props.name}
      </label>
      {/* INPUT CONTROL */}
      <div>
        <div
          className={`flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md min-w-fit ${
            meta.error && meta.touched
              ? 'ring-red-300   focus:ring-red-500'
              : 'ring-gray-300  focus-within:ring-indigo-600'
          }`}
        >
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            {props.addon}
          </span>
          {/* INPUT */}
          <input
            {...field}
            {...props}
            autoComplete="off"
            className={`block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
              meta.error && meta.touched
                ? ' text-red-900  placeholder:text-red-300'
                : ' text-gray-900 placeholder:text-gray-400'
            }`}
            // TODO: what is this? should it be {meta.error && meta.touched}
            aria-invalid="true"
            aria-describedby={`${props.name}-error`}
          />

          {/* EXCLAMATION ICON */}
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className={`h-5 w-5 text-red-500 ${
                meta.error && meta.touched ? 'visible' : 'invisible'
              }`}
              aria-hidden="true"
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default InputGroupInputWithInline

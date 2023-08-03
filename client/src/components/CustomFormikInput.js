import { useField, ErrorMessage } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const CustomFormikInput = ({ labelText, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="grow">
      {/* LABEL */}
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelText || props.name}
      </label>

      {/* INPUT CONTROL */}
      <div className="relative mt-2 ">
        <input
          {...field}
          {...props}
          className={`block w-full rounded-md border-0 py-1.5 sm:text-sm sm:leading-6 ring-1 ring-inset focus:ring-2 focus:ring-inset ${
            meta.error && meta.touched
              ? ' text-red-900  ring-red-300 placeholder:text-red-300  focus:ring-red-500 '
              : ' text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600'
          }`}
          // TODO: what is this? should it be {meta.error && meta.touched}
          aria-invalid={meta.error && meta.touched}
          aria-describedby={`${props.name}-error`}
        />

        {/* EXCLAMATION ICON */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className={`h-5 w-5 text-red-500 ${
              meta.error && meta.touched ? 'visible' : 'invisible'
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
      <p
        id={`${props.name}-error`}
        className={`mt-2 text-sm text-red-600 transition ${
          meta.error && meta.touched ? 'visible' : 'invisible'
        }`}
      >
        {meta.error || '_'}
      </p>
    </div>
  )
}

export default CustomFormikInput

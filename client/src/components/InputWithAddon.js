import { useField } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const InputWithAddon = ({ labelText, ...props }) => {
  const [field, meta] = useField(props)
  
  return (
    <div>
      {/* LABEL */}
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelText || props.name}
      </label>

      {/* INPUT CONTROL */}
      <div className="mt-2 flex rounded-md shadow-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
          {props.addon}
        </span>
        <input
          {...field}
          {...props}
          className={`block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 sm:text-sm sm:leading-6 ring-1 ring-inset focus:ring-2 focus:ring-inset ${
            meta.error && meta.touched
              ? ' text-red-900  ring-red-300 placeholder:text-red-300  focus:ring-red-500'
              : ' text-gray-900 ring-gray-300 placeholder:text-gray-400  focus:ring-indigo-600'
          }`}
          // TODO: what is this? should it be {meta.error && meta.touched}
          aria-invalid="true"
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

export default InputWithAddon

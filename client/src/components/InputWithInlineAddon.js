import { useField } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const InputWithInlineAddon = ({ labelText, ...props }) => {
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
      <div className="mt-2">
        <div
          className={`flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md ${
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
            className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
              meta.error && meta.touched
                ? ' text-red-900  placeholder:text-red-300'
                : ' text-gray-900 placeholder:text-gray-400'
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
      </div>
      {/* ERROR FIELD */}
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

export default InputWithInlineAddon

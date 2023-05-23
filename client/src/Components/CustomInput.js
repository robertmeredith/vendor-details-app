import { useField } from 'formik'

const CustomInput = ({ labelText, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="form-control w-full max-w-xs">
      <label className="mt-2" htmlFor={props.name}>
        {labelText || props.name}
      </label>
      <input
        className="input input-bordered input-accent w-full max-w-xs mt-2"
        {...field}
        {...props}
      />
      {meta.error && meta.touched && <p>{meta.error}</p>}
    </div>
  )
}

export default CustomInput

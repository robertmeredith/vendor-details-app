const FormikRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  onBlur,
}) => {
  return (
    <div className={'form-control w-full max-w-xs'}>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        className="input input-bordered"
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  )
}

export default FormikRow

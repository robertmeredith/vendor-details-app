import InputGroupSelect from './InputGroupSelect'
import InputGroupCustomInput from './InputGroupCustomInput'
import InputGroupInputWithInline from './InputGroupInputWithInline'

const UserDetailsInputGroup = ({ userDetails }) => {
  return (
    <div className="flex gap-4 md:gap-2 lg:items-center pb-8 border-b-2 ">
      <div>
        {/* VENDOR TYPE */}
        <InputGroupSelect
          name={`user-vendorType`}
          defaultValue={userDetails.vendorType}
          options={[userDetails.vendorType]}
          disabled={true}
        />
      </div>
      <div className="lg:flex flex-grow gap-x-2 gap-y-4 grid md:grid-cols-2 pr-10 sm:pr-0">
        {/* <div className="lg:flex flex-grow gap-x-2 gap-y-4 grid sm:grid-cols-2"> */}
        {/* VENDOR NAME*/}
        <InputGroupCustomInput
          name={`user-name`}
          labelText={'Name'}
          value={userDetails.name}
          disabled={true}
        />
        {/* VENDOR INSTAGRAM */}
        <InputGroupInputWithInline
          name={`user-instagram`}
          id={`user-instagram`}
          labelText="Instagram Username"
          addon="@"
          value={userDetails.instagram}
          disabled={true}
        />
        {/* VENDOR EMAIL*/}
        <InputGroupCustomInput
          name={`user-email`}
          labelText={'Email'}
          value={userDetails.email}
          disabled={true}
        />
        {/* VENDOR WEBSITE*/}
        <InputGroupCustomInput
          name={`user-website`}
          labelText={'Website'}
          value={userDetails.website}
          disabled={true}
        />
      </div>
    </div>
  )
}

export default UserDetailsInputGroup

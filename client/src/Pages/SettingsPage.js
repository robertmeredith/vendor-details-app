import SectionHeading from "../components/SectionHeading";
import SettingsForm from "../components/SettingsForm";


const text = 'Customise your settings'

const SettingsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 min-w-[20rem]">
      <SectionHeading text={text} section="Profile Settings" />
      <div className="mx-auto max-w-7xl">
        <SettingsForm />
      </div>
    </div>
  )
};

export default SettingsPage;
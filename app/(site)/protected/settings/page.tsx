import { SettingsForm } from "./SettingsForm";
import { getUserSettings } from "./getUserSettings";

const Settings = async () => {
  const initialValues = await getUserSettings();

  return (
    <div className="p-5 h-[85vh]">
      <h1 className="font-extrabold">Ustawienia</h1>
      <SettingsForm initialValues={initialValues} />
    </div>
  );
};

export default Settings;

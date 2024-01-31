import { SettingsForm } from "./SettingsForm";
import { getUserSettings } from "./getUserSettings";

const Settings = async () => {
  const initialValues = await getUserSettings();

  return (
    <div className="p-5 h-full overflow-auto flex flex-col">
      <h1 className="font-extrabold">Ustawienia</h1>
      <SettingsForm initialValues={initialValues} />
    </div>
  );
};

export default Settings;

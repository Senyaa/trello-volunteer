import Container from "@/app/components/ui/Container";
import { SettingsForm } from "./SettingsForm";
import { getUserSettings } from "./getUserSettings";

const Settings = async () => {
  const initialValues = await getUserSettings();

  return (
    <Container>
      <h1 className="font-extrabold">Ustawienia</h1>
      <SettingsForm initialValues={initialValues} />
    </Container>
  );
};

export default Settings;

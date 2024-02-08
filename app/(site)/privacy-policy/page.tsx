import getDocument from "@/actions/getDocument";
import BackButton from "@/app/components/BackButton";

const PrivacyPolicy = async () => {
  const privacyPolicy = await getDocument("privacy-policy");

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="max-w-[640px] mt-4"
        dangerouslySetInnerHTML={{
          __html:
            privacyPolicy || "Błąd przy pobieraniu polityki prywatności :(",
        }}
      ></div>
      <BackButton classes="w-[250px]"/>
    </div>
  );
};

export default PrivacyPolicy;

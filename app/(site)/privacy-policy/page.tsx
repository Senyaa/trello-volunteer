import { getPrivacyPolicy } from "@/actions/getPrivacyPolicy";
import BackButton from "@/app/components/BackButton";
const PrivacyPolicy = async () => {
  const privacyPolicy = await getPrivacyPolicy();

  return (
    <div className="mt-5 md:mt-20 px-8 flex flex-col items-center ">
      <div dangerouslySetInnerHTML={{ __html: privacyPolicy || "Wystąpił błąd w pobieraniu polityki prywatności" }}></div>
      <BackButton classes="w-[250px]" />
    </div>
  );
};

export default PrivacyPolicy;

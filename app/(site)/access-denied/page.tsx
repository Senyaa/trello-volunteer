import LoginForm from "@/app/components/LoginForm";
import { getServerSession } from "@/lib/getSession";
import Image from "next/image";


const AccessDenied = async (params: {
  searchParams: { boardAccess?: string };
}) => {
  const session = await getServerSession();

  const additionalInfo = () => {
    if (!session) {
      return (
        <div className="mt-2">
          <LoginForm />
        </div>
      );
    } else if (params.searchParams.boardAccess === "false") {
      return (
        <span>
          Poproś swojego mentora o dodanie cię do odpowiedniego boarda w trello.
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full text-center h-[85vh] pt-4">
      <span className="mb-4">Nie masz dostepu do tej strony. </span>
      <Image
          src="https://http.cat/401.jpg"
          width={500}
          height={500}
          alt="kotek"
        />
      {additionalInfo()}
    </div>
  );
};

export default AccessDenied;

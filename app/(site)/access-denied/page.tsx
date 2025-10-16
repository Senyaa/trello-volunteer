import LoginForm from "@/app/components/LoginForm";
import { fetcher } from "@/app/helpers/fetcher";
import { getToken } from "@/app/helpers/getToken";
import trelloURL from "@/app/helpers/trelloUrlParser";
import { getServerSession } from "@/lib/getSession";
import { Session } from "next-auth";
import Image from "next/image";

const isOauthTokenInvalid = async (session: Session | null) => {
  if (!session?.user) {
    return false;
  }

  const token = await getToken(session?.user?.trelloId || "");

  return fetcher(trelloURL(`/1/tokens/${token}`, token), true)
    .then((r) => false)
    .catch((err) => err.message);
};

const AccessDenied = async (params: {
  searchParams: Promise<{ boardAccess?: string }>;
}) => {
  const sp = await params.searchParams;
  const noAccess = sp.boardAccess === "false";
  const session = await getServerSession();

  const tokenInvalid = await isOauthTokenInvalid(session);

  const additionalInfo = () => {
    if (!session || tokenInvalid) {
      return (
        <div className="mt-2">
          <LoginForm />
        </div>
      );
    } else if (noAccess) {
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

import LoginButton from "@/app/components/LoginButton";
import { getServerSession } from "@/lib/getSession";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex justify-center mt-5">
      <div>
        <LoginButton
          label="Zaloguj się przez trello"
          iconRight={<FontAwesomeIcon icon={faTrello} size="sm" className="ml-2"/>}
        />
      </div>
    </main>
  );
};

export default Login;

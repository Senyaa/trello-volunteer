import LoginForm from "@/app/components/LoginForm";
import { getServerSession } from "@/lib/getSession";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import Image from "next/image";

const Login = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex justify-center  items-center mt-5 h-[75vh]">
      <div>
        <Image
          src="https://http.cat/401.jpg"
          width={500}
          height={500}
          alt="kotek"
        />
        <LoginForm
          label="Zaloguj się przez trello"
          classes="w-full"
          iconRight={
            <FontAwesomeIcon icon={faTrello} size="sm" className="ml-2" />
          }
        />
      </div>
    </main>
  );
};

export default Login;

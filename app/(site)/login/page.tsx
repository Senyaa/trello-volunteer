import LoginButton from "@/app/components/LoginButton";
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
        <h2>Nie masz dostępu do tej strony </h2>
        <div className="relative h-[12rem] rounded-md my-2">
          <Image
            src={"/assets/placeholder.png"}
            fill
            sizes="5rem"
            alt="kotek"
            quality={50}
            className="object-cover rounded-md"
          />
        </div>
        <LoginButton
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

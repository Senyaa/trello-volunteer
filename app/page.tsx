import { getServerSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { MAIN_PAGE } from "./helpers/consts";

const Home = async () => {
  const session = await getServerSession();
  if (session) {
    redirect(MAIN_PAGE);
  }
  return (
    <article className="p-5 text-center flex flex-col items-center">
      <div className="mb-5 text-lg font-bold">Witaj!</div>
      <p className="w-[50vw]">
        Strona jest w trakcie testów, ale jeśli masz dostęp do tablicy trello
        fundacji i chcesz przejrzeć ✨tylko ważne rzeczy o kotach✨, to
        zapraszam!
      </p>
      <LoginForm classes="mt-5"/>
    </article>
  );
};

export default Home;

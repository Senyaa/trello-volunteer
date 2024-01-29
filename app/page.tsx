import { getServerSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/protected/home");
  }
  return (
    <article className="p-5 text-center">
      <div className="mb-5 text-lg font-bold">Witaj!</div>
      <p>
        Strona jest w trakcie testów, ale jeśli masz dostęp do tablicy trello
        fundacji i chcesz przejrzeć ✨tylko ważne rzeczy o kotach✨, to
        zapraszam!
      </p>
    </article>
  );
};

export default Home;

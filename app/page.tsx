import { getServerSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { MAIN_PAGE } from "./helpers/consts";
import Image from "next/image";

const Home = async () => {
  const session = await getServerSession();
  if (session) {
    redirect(MAIN_PAGE);
  }
  return (
    <article className="text-center flex flex-col md:flex-row items-center md:justify-center h-full overflow-auto">
      <div className="bg-neural-100 dark:bg-black md:h-full p-5 md:w-[50%] flex flex-col justify-center items-center ">
        <div className="md:max-w-[400px]">
          <div className="mb-5 text-lg font-bold">Cześć wolontariuszu!</div>
          <p>
            Ta strona powstała, aby ułatwić dyżur w fundacji i działa na
            podstawie danych z trello. Jeśli masz pomysły na jakiekolwiek
            usprawnienia, podziel się nimi.
          </p>
          <p className="mb-5">Fajnie, ze jesteś!</p>
          <LoginForm classes="mt-5 w-full" />
        </div>
      </div>
      <Image
        className="w-full md:w-[50%] h-[300px] md:h-full object-cover"
        src="https://images.unsplash.com/photo-1594546927369-f4f587649acc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hedgehog"
        width={1887}
        height={300}
        priority
      />
      {/* <img
        className="w-full md:w-[50%] h-[300px] md:h-full object-cover"
        src="https://images.unsplash.com/photo-1594546927369-f4f587649acc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hedgehog"
      /> */}
    </article>
  );
};

export default Home;

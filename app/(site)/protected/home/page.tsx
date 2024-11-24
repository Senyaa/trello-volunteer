import getNewAnimals from "@/actions/getNewAnimals";
import { getServerSession } from "@/lib/getSession";
import MiniAnimalCard from "@/app/components/MiniAnimalCard";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import getLinks from "@/actions/getLinks";
import LinkType from "../../admin/links/types";

const Home = async () => {
  const session = await getServerSession();

  const newAnimals = await getNewAnimals(session?.user?.trelloId || "", 30);
  const links = await getLinks() ;


  const isEndOfMonth = new Date().getDate() > 21;

  return (
    <Container>
      <span className="mb-4 text-lg">Cześć {session?.user?.name}!</span>

      <span className="mb-4 text-neutral-700 dark:text-neutral-300">
        Design strony głównej jest w trakcie. Co chciał(a)byś tu zobaczyć?
      </span>

      {isEndOfMonth && (
        <div className="p-4 bg-neutral-200 dark:bg-neutral-800 mb-4 border border-green-700 flex flex-row  items-center rounded-md">
          <FontAwesomeIcon
            icon={faWarning}
            className="mr-4 text-green-700 text-xl"
          />
          <div>
            <p className="font-bold text-green-700">Kończy się miesiąc </p>
            <p>
              Uzupełnij{" "}
              <Link
                href={process.env.NEXT_PUBLIC_ACTIVITY_SHEET || "#"}
                className="underline"
              >
                plik aktywności
              </Link>
            </p>
          </div>
        </div>
      )}

      {newAnimals.length > 0 ? (
        <div className="mb-4">
          <div className="mb-2">
            <h2 className="font-extrabold">
              Nowi podopieczni ({newAnimals.length})
            </h2>
            <div className="text-sm text-neutral-500 leading-tight">
              Karty kotów i psów załozone w ciągu ostatnich 30 dni. Zobacz w
              trello klikając strzałkę.
            </div>
          </div>

          <div className="overflow-x-scroll flex pb-2">
            {newAnimals.map((animal) => (
              <MiniAnimalCard animal={animal} key={animal.id} />
            ))}
          </div>
        </div>
      ) : null}

      <section className="my-4">
        <h2 className="font-extrabold mb-2">Linki</h2>
        <ul>
          {(links as LinkType[]).map((link) => (
            <li key={link.id}>
              <Button
                href={link.url || "#"}
                label={link.label}
                classes="w-full max-w-[400px] mb-2 block"
                color="grey"
              />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default Home;

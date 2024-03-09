import { filterDogs } from "@/app/helpers/cardFilters";
import { getParsedCards } from "@/actions/getParsedCards";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getSession";
import Container from "@/app/components/ui/Container";
import DogsData from "@/app/components/DogsData";

const Dogs = async () => {
  const session = await getServerSession();

  const cards = await getParsedCards(session?.user?.trelloId || "").catch(
    (e) => {
      if (e.message.includes("Unauthorized")) {
        redirect("/access-denied?boardAccess=false");
      }
      return [];
    }
  );

  const allDogs = filterDogs(cards).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Container>
      <h1 className="uppercase m-2">{`Pieski (${allDogs.length})`}</h1>
      <DogsData allDogs={allDogs} />
    </Container>
  );
};
export default Dogs;

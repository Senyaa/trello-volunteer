import { filterDogs } from "@/app/helpers/cardFilters";
import { getParsedCards } from "@/actions/getParsedCards";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getSession";
import Container from "@/app/components/ui/Container";
import DogsData from "@/app/components/DogsData";
import Button from "@/app/components/ui/Button";
import { isMobile } from "@/app/helpers/isMobile";
import CheatSheetButton from "@/app/components/CheatSheetButton";

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
      <div className="flex justify-between mb-2">
        <h1 className="uppercase m-2">{`Pieski (${allDogs.length})`}</h1>
        <CheatSheetButton/>
      </div>
      <DogsData allDogs={allDogs} />
    </Container>
  );
};
export default Dogs;

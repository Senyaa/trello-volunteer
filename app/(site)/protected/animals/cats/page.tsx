import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getSession";
import { catRooms, filterCats } from "@/app/helpers/cardFilters";
import CatsNav from "@/app/components/CatsNav";
import AnimalList from "../../../../components/AnimalList";
import { getUserSettings } from "../../settings/getUserSettings";
import { getParsedCards } from "@/actions/getParsedCards";
import Container from "@/app/components/ui/Container";

const Cats = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession();
  const settings = await getUserSettings();

  const roomId = catRooms.find(
    (r) =>
      r.name.toLocaleLowerCase() === searchParams?.room?.toLocaleLowerCase()
  )?.id;

  const cards = await getParsedCards(session?.user?.trelloId || "");

  const allCats = filterCats(cards)
  const filteredCards = allCats
    .filter((card) => (roomId ? card.idList === roomId : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  const isLowerCatroom =
    searchParams?.room?.toLocaleLowerCase() === "lowercatroom";

  return (
    <Container>
      <CatsNav
        currentRoom={searchParams?.room || ""}
        animalListLength={filteredCards.length}
      />
      {isLowerCatroom && (
        <span className="p-2 mt-4">Do karmy podaj vetomune/genomune</span>
      )}
      <AnimalList animals={filteredCards} settings={settings} allAnimals={allCats}/>
    </Container>
  );
};

export default Cats;

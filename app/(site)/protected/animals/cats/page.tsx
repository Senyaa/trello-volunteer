import { getServerSession } from "@/lib/getSession";
import { catRooms, filterCats } from "@/app/helpers/cardFilters";
import CatsNav from "@/app/components/cards/CatsNav";
import AnimalList from "../../../../components/cards/AnimalList";
import { getUserSettings } from "../../settings/getUserSettings";
import { getParsedCards } from "@/actions/getParsedCards";
import Container from "@/app/components/ui/Container";

import RoomReminders from "@/app/components/cards/RoomReminders";
import getCards from "@/app/client/getCards";

const Cats = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const session = await getServerSession();
  const settings = await getUserSettings();

  const searchParamsResolved = await searchParams;
  const roomParamRaw = searchParamsResolved?.room;
  const roomParam = Array.isArray(roomParamRaw)
    ? roomParamRaw[0]
    : roomParamRaw;
  const room = roomParam ? roomParam.toLocaleLowerCase() : undefined;

  const roomId = catRooms.find((r) => r.name.toLocaleLowerCase() === room)?.id;

  const cards = await getParsedCards(session?.user?.trelloId || "");
  const infoCards = (await getCards(session?.user?.trelloId || "")).filter(
    (card) => card.name.includes("tu lubi")
  );

  const allCats = filterCats(cards);
  const filteredCards = allCats
    .filter((card) => (roomId ? card.idList === roomId : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container>
      <CatsNav
        currentRoom={room || ""}
        animalListLength={filteredCards.length}
      />
      <RoomReminders room={room} infoCards={infoCards}/>
      <AnimalList
        animals={filteredCards}
        settings={settings}
        allAnimals={allCats}
      />
    </Container>
  );
};

export default Cats;

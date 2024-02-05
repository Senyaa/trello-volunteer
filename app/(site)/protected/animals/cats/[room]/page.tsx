import AnimalList from "@/app/components/AnimalList";
import { catRooms, filterCats } from "@/app/helpers/cardFilters";
import CatsNav from "@/app/components/CatsNav";
import { getUserSettings } from "../../../settings/getUserSettings";
import { getServerSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getParsedCards } from "@/actions/getParsedCards";

interface CatsRoomProps {
  params: { room: string };
}

export default async function CatsRoom({ params }: CatsRoomProps) {
  const settings = await getUserSettings();
  const session = await getServerSession();

  const roomId = catRooms.find(
    (r) => r.name.toLocaleLowerCase() === params.room.toLocaleLowerCase()
  )?.id;

  const cards = await getParsedCards(session?.user?.trelloId || "").catch((e) => {
    if (e.message.includes("Unauthorized")) {
      redirect("/access-denied?boardAccess=false");
    }
    return [];
  });

  const filteredCards = filterCats(cards)
    .filter((card) => card.idList === roomId)
    .sort((a, b) => a.name.localeCompare(b.name));

  const isLowerCatroom = params.room.toLocaleLowerCase() === "lowercatroom";

  return (
    <div>
      <div className="flex justify-between items-end px-2 pt-2">
        <h1 className="uppercase m-2">{`Koty (${filteredCards.length})`}</h1>
        <CatsNav current={params.room} />
      </div>
      {isLowerCatroom && (
        <span className="p-2 mt-4">Do karmy podaj vetomune/genomune</span>
      )}
      <AnimalList animals={filteredCards} settings={settings} />
    </div>
  );
}

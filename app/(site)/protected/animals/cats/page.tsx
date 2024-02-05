import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getSession";
import { catRooms, filterCats } from "@/app/helpers/cardFilters";
import CatsNav from "@/app/components/CatsNav";
import AnimalList from "../../../../components/AnimalList";
import { getUserSettings } from "../../settings/getUserSettings";
import { getParsedCards } from "@/actions/getParsedCards";

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

  const cards = await getParsedCards(session?.user?.trelloId || "").catch(
    (e) => {
      if (e.message.includes("Unauthorized")) {
        redirect("/access-denied?boardAccess=false");
      }
      return [];
    }
  );
  const filteredCards = filterCats(cards)
    .filter((card) => (roomId ? card.idList === roomId : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  const isLowerCatroom =
    searchParams?.room?.toLocaleLowerCase() === "lowercatroom";
    
  return (
    <div>
      <div className="flex justify-between items-end px-2 pt-2">
        <h1 className="uppercase m-2">{`Koty (${filteredCards.length})`}</h1>
        <CatsNav current={searchParams?.room || ""} />
      </div>
      {isLowerCatroom && (
        <span className="p-2 mt-4">Do karmy podaj vetomune/genomune</span>
      )}
      <AnimalList animals={filteredCards} settings={settings} />
    </div>
  );
};

export default Cats;

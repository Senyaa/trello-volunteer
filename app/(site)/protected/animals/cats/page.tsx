import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getSession";
import { filterCats } from "@/app/helpers/cardFilters";
import CatsNav from "@/app/components/CatsNav";
import AnimalList from "../../../../components/AnimalList";
import { getUserSettings } from "../../settings/getUserSettings";
import { getParsedCards } from "@/actions/getParsedCards";

const Cats = async () => {
  const session = await getServerSession();
  const settings = await getUserSettings();

  const cards = await getParsedCards(session?.user?.trelloId || "").catch((e) => {
    if (e.message.includes("Unauthorized")) {
      redirect("/access-denied?boardAccess=false");
    }
    return [];
  });

  const filteredCards = filterCats(cards).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <div className="flex justify-between items-end px-2 pt-2">
        <h1 className="uppercase m-2">{`Koty (${filteredCards.length})`}</h1>
        <CatsNav/>
      </div>
      <AnimalList animals={filteredCards} settings={settings} />
    </div>
  );
};

export default Cats;

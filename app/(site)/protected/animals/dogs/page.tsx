import { filterDogs } from "@/app/helpers/cardFilters";
import { getParsedCards } from "@/actions/getParsedCards";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getSession";
import Container from "@/app/components/ui/Container";
import CheatSheetButton from "@/app/components/pdf/CheatSheetButton";
import AnimalList from "@/app/components/AnimalList";
import { getUserSettings } from "../../settings/getUserSettings";
import Button from "@/app/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Dogs = async () => {
  const session = await getServerSession();
  const settings = await getUserSettings();

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
        <div>
          <Button
            href="/protected/settings"
            classes="px-2 mr-2"
            color="grey"
            label={<span className="hidden md:inline">Pola</span>}
            iconRight={<FontAwesomeIcon icon={faGear} className="md:ml-2" />}
          />
          <CheatSheetButton />
        </div>
      </div>
      <AnimalList animals={allDogs} settings={settings} allAnimals={allDogs} />
    </Container>
  );
};
export default Dogs;

import { getServerSession } from "@/lib/getSession";
import { catRooms, filterCats } from "@/app/helpers/cardFilters";
import CatsNav from "@/app/components/cards/CatsNav";
import AnimalList from "../../../../components/cards/AnimalList";
import { getUserSettings } from "../../settings/getUserSettings";
import { getParsedCards } from "@/actions/getParsedCards";
import Container from "@/app/components/ui/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

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

  const allCats = filterCats(cards);
  const filteredCards = allCats
    .filter((card) => (roomId ? card.idList === roomId : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  const isLowerCatroom = room === "lowercatroom";
  const isUpperCatroom = room === "uppercatroom";

  const dayOfTheWeek = new Date().getDay();

  const isFriday = dayOfTheWeek === 5;
  const isMonday = dayOfTheWeek === 1;

  return (
    <Container>
      <CatsNav
        currentRoom={room || ""}
        animalListLength={filteredCards.length}
      />
       <div className="mb-4">
        {(isLowerCatroom || !room) && isFriday && (
          <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row  items-center rounded-md">
            <FontAwesomeIcon
              icon={faWarning}
              className="mr-4 text-green-700 text-xl"
            />
            <div>
              <p className="font-bold text-green-700">Dziś jest piątek </p>
              <p>Zmień legowiska w dolnej kociarni </p>
            </div>
          </div>
        )}
        {(isUpperCatroom || !room) && isMonday && (
          <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row  items-center rounded-md">
            <FontAwesomeIcon
              icon={faWarning}
              className="mr-4 text-green-700 text-xl"
            />
            <div>
              <p className="font-bold text-green-700">
                Dziś jest poniedziałek{" "}
              </p>
              <p>Zmień legowiska w górnej kociarni </p>
            </div>
          </div>
        )}
        {isLowerCatroom && (
          <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row  items-center rounded-md">
            <span>Do karmy podaj vetomune/genomune</span>
          </div>
        )}
      </div>
    <AnimalList
        animals={filteredCards}
        settings={settings}
        allAnimals={allCats}
      /> 
    </Container>
  );
};

export default Cats;

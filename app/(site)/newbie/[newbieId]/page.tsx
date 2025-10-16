import { getGuestView } from "@/actions/getGuestView";
import getUser from "@/actions/getUser";
import AnimalList from "@/app/components/cards/AnimalList";
import CatsNav from "@/app/components/cards/CatsNav";
import { catRooms } from "@/app/helpers/cardFilters";
import { parseToHumanDateTime } from "@/app/helpers/parseToHumanDatetime";
import { Card } from "@/app/types/Card";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import { catsNewbieSettings, dogsNewbieSettings } from "@/app/helpers/consts";


const NewbiePage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ newbieId: string }>;
}) => {
  const paramsResolved = await params

  const sp = await searchParams;  
  const newbieId = paramsResolved.newbieId;
  const validUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!validUUID.test(newbieId)) {
    return (
      <div className="pt-4 text-center flex justify-center items-center flex-col">
        <Image
          src="https://http.cat/204.jpg"
          width={500}
          height={500}
          alt="kotek"
        />
        <h3 className="font-extrabold text-lg">Oho, tu nic nie ma</h3>
        <span>Poproś wolontariusza o przesłanie poprawnego linku</span>
      </div>
    );
  }

  const guestView = await getGuestView(newbieId);
  const userSharing = await getUser();

  // obrazki

  if ((guestView?.endsAt || new Date()) < new Date()) {
    return (
      <>
        <h3 className="font-extrabold text-lg">
          No i skończyło się rumakowanie.
        </h3>
        <span>Twoja sesja wygasła. Zapraszamy na (dalszy) wolontariat ❤️</span>
      </>
    );
  }

  const roomId = catRooms.find(
    (r) =>
      r.name.toLocaleLowerCase() === sp?.room?.toLocaleLowerCase()
  )?.id;

  const allAnimals: Card[] = guestView?.content as Card[];
  const filteredCards = allAnimals
    .filter((card) => (roomId ? card.idList === roomId : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  const isLowerCatroom =
    sp.room?.toLocaleLowerCase() === "lowercatroom";

  return (
    <Container>
      <div className="p-2 dark:text-neutral-300 text-sm dark:bg-neutral-800 mb-2">
        <span className="block">
          Znajdujesz się w trybie gościa. Zaproszenie od:{" "}
          {userSharing?.fullName}
        </span>
        <span>
          Dostęp do tego widoku zakończy się o{" "}
          {parseToHumanDateTime(guestView?.endsAt)}
        </span>
      </div>
      {guestView?.type === "cats" ? (
        <>
          <CatsNav
            currentRoom={sp?.room || ""}
            animalListLength={filteredCards.length}
            route={`/newbie/${newbieId}`}
          />
          {isLowerCatroom && (
            <span className="p-2 mt-4">Do karmy podaj vetomune/genomune</span>
          )}
        </>
      ) : (
        <div className="flex justify-between mb-2">
          <h1 className="uppercase">{`Psy (${filteredCards.length})`}</h1>
          {/* TODO: turn on settings while in newbie mode */}
          {/* <Button
            href="/protected/settings"
            classes="px-2"
            color="grey"
            label={<span className="hidden md:inline">Pola</span>}
            iconRight={<FontAwesomeIcon icon={faGear} className="md:ml-2" />}
          /> */}
        </div>
      )}
      <AnimalList
        animals={filteredCards}
        settings={guestView?.type === "cats" ? catsNewbieSettings : dogsNewbieSettings}
        allAnimals={allAnimals}
      />
    </Container>
  );
};

export default NewbiePage;

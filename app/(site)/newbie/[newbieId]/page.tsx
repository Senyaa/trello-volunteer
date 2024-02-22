import { getGuestView } from "@/actions/getGuestView";
import getUser from "@/actions/getUser";
import AnimalList from "@/app/components/AnimalList";
import CatsNav from "@/app/components/CatsNav";
import { catRooms } from "@/app/helpers/cardFilters";
import { parseToHumanDateTime } from "@/app/helpers/parseToHumanDatetime";
import { Card } from "@/app/types/Card";
import { getServerSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Image from "next/image";

const allTrueSettings = {
  testsEnabled: true,
  medsEnabled: true,
  statusEnabled: true,
  personalityEnabled: true,
  castrationEnabled: true,
  dogInteractionEnabled: true,
  catInteractionEnabled: true,
  childrenInteractionEnabled: true,
  dewormingEnabled: true,
  healthEnabled: true,
  storyEnabled: true,
  infoForCarerEnabled: true,
};

const NewbiePage = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { newbieId: string };
}) => {
  const newbieId = params.newbieId;
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
  const session = await getServerSession();
  if (session) {
    redirect("/protected/animals/cats");
  }
  const guestView = await getGuestView(newbieId);
  const userSharing = await getUser(guestView?.userId || "");

  // obrazki

  if ((guestView?.endsAt || new Date()) < new Date()) {
    return (
      <>
        <h3 className="font-extrabold text-lg">No i skończyło się rumakowanie.</h3>
        <span>Twoja sesja wygasła. Zapraszamy na (dalszy) wolontariat ❤️</span>
      </>
    );
  }

  const roomId = catRooms.find(
    (r) =>
      r.name.toLocaleLowerCase() === searchParams?.room?.toLocaleLowerCase()
  )?.id;

  const allCats: Card[] = guestView?.content as Card[];
  const filteredCards = allCats
    .filter((card) => (roomId ? card.idList === roomId : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  const isLowerCatroom =
    searchParams.room?.toLocaleLowerCase() === "lowercatroom";

  return (
    <div>
      <div className="p-2 dark:text-neutral-500 text-sm">
        <span className="block">
          Znajdujesz się w trybie gościa. Zaproszenie od:{" "}
          {userSharing?.fullName}
        </span>
        <span>
          Dostęp do tego widoku zakończy się o{" "}
          {parseToHumanDateTime(guestView?.endsAt)}
        </span>
      </div>
      <CatsNav
        current={searchParams?.room || ""}
        animalListLength={filteredCards.length}
        route={`/newbie/${newbieId}`}
      />
      {isLowerCatroom && (
        <span className="p-2 mt-4">Do karmy podaj vetomune/genomune</span>
      )}
      <AnimalList
        animals={filteredCards}
        settings={allTrueSettings}
        allCats={allCats}
      />
    </div>
  );
};

export default NewbiePage;

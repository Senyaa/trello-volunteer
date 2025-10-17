import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { TrelloCard } from "@/app/types/Card";
import { catRoomsMap } from "@/app/helpers/cardFilters";

const RoomReminders = ({
  room,
  infoCards,
}: {
  infoCards: TrelloCard[];
  room?: string | null;
}) => {
  const isLowerCatroom = room === "lowercatroom";
  const isUpperCatroom = room === "uppercatroom";

  const dayOfTheWeek = new Date().getDay();

  const isFriday = dayOfTheWeek === 5;
  const isMonday = dayOfTheWeek === 1;

  const infoCardsPerRoom = infoCards?.filter((card) => {
    const cardList = card.idList;
    const currentRoomId = room ? catRoomsMap[room] : "";

    console.log("cardList", cardList, "currentRoomId", currentRoomId, "room", room);
    return cardList === currentRoomId || room === null || room === undefined;
  });

  return (
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
        <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row items-center rounded-md">
          <FontAwesomeIcon
            icon={faWarning}
            className="mr-4 text-green-700 text-xl"
          />
          <div>
            <p className="font-bold text-green-700">Dziś jest poniedziałek </p>
            <p>Zmień legowiska w górnej kociarni </p>
          </div>
        </div>
      )}
      {(isLowerCatroom || !room) && (
        <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row items-center rounded-md">
          <span>{`Do karmy ${!room ? "w dolnej kociarni ": ""}podawaj vetomune/genomune`}</span>
        </div>
      )}
      {infoCardsPerRoom.length > 0 && (
        <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-pink-700 rounded-md">
          <p className="font-bold text-pink-700">Kto się lubi</p>
          {infoCardsPerRoom?.map((infoCard) => (
            <p key={infoCard.id} className="whitespace-pre">
              {infoCard.desc}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomReminders;

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faWarning } from "@fortawesome/free-solid-svg-icons";
import { TrelloCard } from "@/app/types/Card";
import { catRoomsMap } from "@/app/helpers/cardFilters";
import { useState } from "react";

const RoomReminders = ({
  room,
  infoCards,
}: {
  infoCards: TrelloCard[];
  room?: string | null;
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const isLowerCatroom = room === "lowercatroom";
  const isUpperCatroom = room === "uppercatroom";

  const dayOfTheWeek = new Date().getDay();

  const isFriday = dayOfTheWeek === 5;
  const isMonday = dayOfTheWeek === 1;

  const infoCardsPerRoom = infoCards?.filter((card) => {
    const cardList = card.idList;
    const currentRoomId = room ? catRoomsMap[room] : "";

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
          <span>{`Do karmy ${
            !room ? "w dolnej kociarni " : ""
          }podawaj vetomune/genomune`}</span>
        </div>
      )}
      {infoCardsPerRoom.length > 0 && (
        <div className="pt-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-pink-700 rounded-md">
          <div className="flex flex-row items-center mb-2">
            <p className="font-bold text-pink-700">Kto się lubi</p>
            <button
              className="ml-auto text-pink-700 text-sm"
              onClick={() => setIsClosed(!isClosed)}
            >
              <FontAwesomeIcon
                icon={!isClosed ? faChevronUp : faChevronDown}
                className="ml-2"
              />
            </button>
          </div>
          <div
            className={`flex flex-col gap-2 py-2 ${isClosed ? "hidden" : "block"}`}
          >
            {infoCardsPerRoom?.map((infoCard) => (
              <p key={infoCard.id} className="whitespace-pre">
                {infoCard.desc}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomReminders;

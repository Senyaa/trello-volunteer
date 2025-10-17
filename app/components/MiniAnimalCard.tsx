"use client";

import { FC } from "react";
import getDetails from "../helpers/details";
import parseTrelloIdToCreatedDate from "../helpers/parseTrelloIdToCreatedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import AnimalPhoto from "./cards/AnimalPhoto";
import { Card } from "../types/Card";

interface MinimalAnimalCardProps {
  animal: Card;
}

const MiniAnimalCard: FC<MinimalAnimalCardProps> = ({ animal }) => {
  const personality = getDetails(animal.desc).personality;

  return (
    <div className="bg-white shadow-sm dark:bg-neutral-900 rounded-md p-4 mx-2 shrink-0 max-w-[250px] h-[120px] overflow-y-hidden ">
      <div className="flex h-full gap-4">
        <AnimalPhoto animal={animal} name={animal.name} isMini/>
        <div className="h-full flex flex-col justify-between">
          <div>
            <span className="font-extrabold">{animal.name?.split("-")[0]}</span>
            <div className="text-ellipsis">
              {personality.length < 30
                ? personality
                : `${personality.substring(0, 30)}...`}
            </div>
          </div>
          <div className="text-xs text-neutral-500 bottom-0">{`od ${parseTrelloIdToCreatedDate(
            animal.id
          ).toLocaleDateString("pl")}`}</div>
        </div>
        <div className="flex items-center">
          <Link href={animal.url}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniAnimalCard;

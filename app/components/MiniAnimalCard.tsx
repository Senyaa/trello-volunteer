"use client";

import { FC, useEffect, useState } from "react";
import getCardCover from "../client/getCardCover";
import getDetails from "../helpers/details";
import parseTrelloIdToCreatedDate from "../helpers/parseTrelloIdToCreatedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface MinimalAnimalCardProps {
  animal: any;
}

const MiniAnimalCard: FC<MinimalAnimalCardProps> = ({ animal }) => {
  const [cover, setCover] = useState("");


  // TODO: extract
  useEffect(() => {
    if (animal.cover.url) {
      if (animal.cover.url.includes("cloudinary")) {
        setCover(animal.cover.url);
        return;
      }

      setCover(`/api/imageFile?url=${animal.cover.url}`);
      return;
    }

    const attachmentId = animal.cover.idAttachment;

    getCardCover(animal.id, attachmentId).then((images) => {
      const coverUrl = images.find((i) => i.id === attachmentId)?.url;

      if (coverUrl) {
        setCover(`/api/imageFile?url=${coverUrl}`);
      }
    });
  }, [animal]);

  const personality = getDetails(animal.desc).personality

  return (
    <div className="bg-white shadow-sm dark:bg-neutral-900 rounded-md p-4 mx-2 shrink-0 max-w-[250px] h-[120px] overflow-y-hidden ">
      <div className="flex h-full">
        <div className="relative h-[4rem] w-[4rem] mr-4 flex-shrink-0">
          <img
            src={cover || "/assets/placeholder.png"}
            alt={animal.name}
            loading="lazy"
            className="object-cover rounded-full aspect-square"
          />
        </div>
        <div className="h-full">
          <span className="font-extrabold">{animal.name.split("-")[0]}</span>
          <div className="text-ellipsis">{personality.length < 30 ?  personality : `${personality.substring(0,30)}...`}</div>
          <div className="text-xs text-neutral-500 ">{`od ${parseTrelloIdToCreatedDate(
            animal.id
          ).toLocaleDateString("pl")}`}</div>
        </div>
        <div className="ml-4 flex items-center">
          <Link href={animal.url}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniAnimalCard;

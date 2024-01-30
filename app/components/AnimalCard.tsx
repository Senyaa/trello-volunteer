"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "../types/Card";
import { FC, useEffect, useState } from "react";
import getCardCover from "../client/getCardCover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "@/lib/redux";
import { selectSettings } from "@/lib/redux/slices/userSlice/selectors";
import CardDetail from "./CardDetail";
import getDetails from "../helpers/details";

interface AnimalCardProps {
  animal: Card;
  detailWidth: string;
}

const AnimalCard: FC<AnimalCardProps> = ({ animal, detailWidth }) => {
  const settings = useSelector(selectSettings);
  const [cover, setCover] = useState("");

  useEffect(() => {
    if (animal.cover.url) {
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

  const { food, meds, tests, warning, status, personality, castration } =
    getDetails(animal.desc);
  const {
    medsEnabled,
    testsEnabled,
    statusEnabled,
    personalityEnabled,
    castrationEnabled,
  } = settings;

  const loaderProp = ({ src, width }: { src: string; width: number }) => {
    return `${src}/?w=${width}`;
  };

  return (
    <div className="p-4 flex flex-col md:flex-row items-center md:items-start rounded-md bg-neutral-900">
      <div className="flex justify-start w-full md:max-w-min md:h-full md:flex-row">
        <div className="relative md:rounded-none h-[7rem] w-[7rem] rounded-full md:h-[4rem] md:w-[4rem] mr-4 flex-shrink-0">
          <Image
            src={cover || "/assets/placeholder.jpg"}
            fill
            sizes="33vw"
            alt={animal.name}
            priority={false}
            loader={loaderProp}
            quality={50}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col w-full md:flex-row md:items-start md:h-full">
          <h3 className="text-xl font-extrabold md:w-28">{animal.name}</h3>
          <div className="md:w-48 md:px-2">
            {warning && (
              <div className="bg-red-300 border border-red-800 w-full rounded-md p-1 px-2 mt-4 md:mt-0">
                <span className="text-red-800 text-xs font-bold">UWAGA!</span>
                <div className="text-red-800 whitespace-pre-wrap leading-none">
                  {warning}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col md:flex-row w-full md:gap-2">
          <CardDetail text={food} icon="🍽" width={detailWidth} />
          <CardDetail
            visible={Boolean(medsEnabled && meds)}
            text={meds}
            icon="💊"
            isOn={settings.medsEnabled}
            width={detailWidth}
          />
          <CardDetail
            visible={Boolean(testsEnabled && tests)}
            text={tests}
            icon="🩸"
            isOn={settings.testsEnabled}
            width={detailWidth}
          />
          <CardDetail
            visible={Boolean(statusEnabled && status)}
            text={status}
            icon="🏠"
            isOn={settings.statusEnabled}
            width={detailWidth}
          />
          <CardDetail
            visible={Boolean(personalityEnabled && personality)}
            text={personality}
            icon="😈"
            isOn={settings.personalityEnabled}
            width={detailWidth}
          />
          <CardDetail
            visible={Boolean(castrationEnabled && castration)}
            text={castration}
            icon="✂️"
            isOn={settings.castrationEnabled}
            width={detailWidth}
          />
        </div>
        <div className="text-right p-1 md:pl-4 md:pr-0">
          <Link href={animal.shortUrl} className="text-sm text-gray-400 w-15">
            <FontAwesomeIcon icon={faTrello} size="lg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;

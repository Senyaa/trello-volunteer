import Link from "next/link";
import { Card } from "../types/Card";
import { FC, useEffect, useState } from "react";
import getCardCover from "../client/getCardCover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import CardDetail from "./CardDetail";
import getDetails from "../helpers/details";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import Button from "./ui/Button";
import ShiftCheckbox from "./ShiftCheckbox";

interface AnimalCardProps {
  animal: Card;
  detailWidth: string;
  settings: SettingsFormType;
  isShift: boolean;
}

const AnimalCard: FC<AnimalCardProps> = ({
  animal,
  detailWidth,
  settings,
  isShift,
}) => {
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

  const [name, info] = animal.name.split(" - ");

  return (
    <div
      className={`p-4 flex flex-col md:flex-row items-center md:items-start rounded-md bg-neutral-100 dark:bg-neutral-900 ${
        animal.isDone ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-start w-full md:max-w-min md:h-full md:flex-row">
        <div className="relative md:rounded-none h-[7rem] w-[7rem] rounded-full md:h-[4rem] md:w-[4rem] mr-4 flex-shrink-0">
          <img
            src={cover || "/assets/placeholder.png"}
            alt={animal.name}
            loading="lazy"
            className="object-cover rounded-full aspect-square"
          />
        </div>
        <div className="flex flex-col w-full md:flex-row md:items-start md:h-full">
          <div className="flex justify-between">
            <h3 className="text-xl font-extrabold md:w-28">{name}</h3>
            {isShift && (
              <ShiftCheckbox
                animalID={animal.id}
                isDone={animal.isDone || false}
                classes="md:hidden"
              />
            )}
          </div>
          <div className="md:w-48 md:px-2">
            {info && (
              <div className="bg-blue-100 dark:bg-blue-300 border border-blue-200 dark:border-blue-800 w-full rounded-md p-1 px-2 mt-2 md:mt-0">
                <div className="text-blue-800 whitespace-pre-wrap leading-none">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  {info}
                </div>
              </div>
            )}
            {warning && (
              <div className="bg-red-100 dark:bg-red-300 border border-red-200 dark:border-red-800 w-full rounded-md p-1 px-2 mt-2 md:mt-0">
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
        <div className="text-right p-1 md:pl-4 md:pr-0 mt-1 md:mt-0">
          <Link
            href={animal.shortUrl}
            className="text-sm text-gray-400 w-15 hidden md:block"
          >
            <FontAwesomeIcon icon={faTrello} size="lg" />
          </Link>
          <Button
            href={animal.shortUrl}
            label="Zobacz w trello"
            iconRight={<FontAwesomeIcon icon={faTrello} className="ml-2" />}
            classes="text-sm text-gray-400 w-15 md:hidden bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;

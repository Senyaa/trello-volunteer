import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { Card } from "../../types/Card";
import CardDetail from "./CardDetail";
import { SettingsFormType } from "../../(site)/protected/settings/SettingsForm";
import Button from "../ui/Button";
import ShiftCheckbox from "../shift/ShiftCheckbox";
import AddNote from "../shift/AddNote";
import { replaceMDLink } from "../../helpers/replaceMDLink";
import getDetails, { getDetailsHeaders } from "../../helpers/details";
import AnimalPhoto from "./AnimalPhoto";

interface AnimalCardProps {
  animal: Card;
  settings: SettingsFormType;
  isShift: boolean;
}

const AnimalCard: FC<AnimalCardProps> = ({ animal, settings, isShift }) => {
  const pathname = usePathname();
  const isNewbieMode = pathname.includes("newbie");

  const detailsValues = getDetails(animal.desc);

  const [name, info] = animal.name?.split(" - ");

  return (
    <div
      className={`p-4 flex flex-col md:flex-row items-center md:items-start rounded-md bg-white shadow-lg dark:shadow-none dark:bg-neutral-900 ${
        animal.isDone ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-start w-full md:max-w-min md:h-full md:flex-row gap-4">
        <AnimalPhoto animal={animal} name={animal.name} />
        <div className="flex flex-col w-full md:flex-row md:items-start md:h-full">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-extrabold md:shrink-0 md:w-[7rem]">
                {name}
              </h3>
              <span className="block text-sm text-neutral-500 leading-none">
                {detailsValues.age}
              </span>
            </div>
            <div className="flex items-start md:hidden">
              {!pathname.includes("newbie") && isShift && (
                <>
                  <AddNote animalID={animal.id} note={animal.note || ""} />
                  <ShiftCheckbox
                    animalID={animal.id}
                    isDone={animal.isDone || false}
                  />
                </>
              )}
            </div>
          </div>
          <div className="md:shrink-0 md:w-[12rem] md:px-2">
            {info && (
              <div className="bg-blue-100 dark:bg-blue-300 border border-blue-200 dark:border-blue-800 w-full rounded-md p-1 px-2 mt-2 md:mt-0 md:mb-1">
                <div className="text-blue-800 whitespace-pre-wrap leading-none">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  {info}
                </div>
              </div>
            )}
            {detailsValues.warning && (
              <div className="bg-red-100 dark:bg-red-300 border border-red-200 dark:border-red-800 w-full rounded-md p-1 px-2 mt-2 md:mt-0">
                <span className="text-red-800 text-xs font-bold">UWAGA!</span>
                <div className="text-red-800 whitespace-pre-wrap leading-none">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: replaceMDLink(detailsValues.warning),
                    }}
                  ></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col md:flex-row w-full md:gap-2">
          <CardDetail text={detailsValues.food} icon="🍽" />
          {getDetailsHeaders(settings, detailsValues).map((detail) => {
            const displayForType = detail.onlyType
              ? pathname.includes(detail?.onlyType)
              : true;
            if (displayForType) {
              return (
                <CardDetail
                  key={detail.plName}
                  visible={Boolean(detail.isEnabled && detail.value)}
                  text={detail.value}
                  icon={detail.icon}
                  isOn={detail.isEnabled}
                />
              );
            }
          })}
        </div>
        {!isNewbieMode && (
          <div className="text-right p-1 md:pl-4 md:pr-0 mt-1 md:mt-0">
            <Link
              href={animal.shortUrl}
              className="text-sm text-gray-400 w-15 hidden md:block"
            >
              <FontAwesomeIcon icon={faTrello} />
            </Link>
            <Button
              href={animal.shortUrl}
              label="Zobacz w trello"
              iconRight={<FontAwesomeIcon icon={faTrello} className="ml-2" />}
              color="grey"
              level="secondary"
              classes="text-sm w-15 md:hidden"
            />
          </div>
        )}
        {!pathname.includes("newbie") && isShift && (
          <div className="hidden md:flex flex-col items-center">
            <ShiftCheckbox
              animalID={animal.id}
              isDone={animal.isDone || false}
              classes="ml-2 mb-2"
            />
            <AddNote animalID={animal.id} note={animal.note || ""} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;

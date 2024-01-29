import { FC } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalCard from "./AnimalCard";

interface AnimalListProps {
  animals: Card[];
  settings: SettingsFormType;
}

const AnimalList: FC<AnimalListProps> = ({ animals, settings }) => {
  if (animals.length === 0) {
    return <span>Nie znaleziono zwierzaków.</span>;
  }

  const getWidthClass = () => {
    let animalDetailsCount = 1;
    if (settings.medsEnabled) {
      animalDetailsCount++;
    }
    if (settings.testsEnabled) {
      animalDetailsCount++;
    }

    // tailwind doesn't support dynamically created classes
    // hence cannot use a template string
    if (animalDetailsCount === 2) return "md:w-1/2";
    if (animalDetailsCount === 3) return "md:w-1/3";
    if (animalDetailsCount === 4) return "md:w-1/4";
    if (animalDetailsCount === 5) return "md:w-1/5";
    if (animalDetailsCount === 6) return "md:w-1/6";
    return "md:w-full";
  };

  const widthClass = getWidthClass();

  return (
    <>
      <div className="hidden z-10 md:flex bg-neutral-900 rounded-md p-2 mx-2 mt-2 gap-2 border-2 border-solid border-black">
        <div className="shrink-0 w-[12rem]">Imię</div>
        <div className="shrink-0 w-[12rem]">Uwagi</div>

        <div className="flex w-full gap-2">
          <div className={widthClass}>🍽 Karma</div>
          {settings.medsEnabled && <div className={widthClass}>💊 Leki</div>}
          {settings.testsEnabled && <div className={widthClass}>🩸 Testy</div>}
          {settings.statusEnabled && <div className={widthClass}> Status</div>}
          {settings.personalityEnabled && <div className={widthClass}> Personality</div>}
          {settings.castrationEnabled && <div className={widthClass}> Castration</div>}
        </div>
        <div className="w-[3rem]">Trello</div>
      </div>
      <ul className="w-full md:my-4">
        {animals
          .map((animal) => (
            <li key={animal.id} className="m-2">
              <AnimalCard animal={animal} detailWidth={widthClass} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default AnimalList;

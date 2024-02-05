"use client";

import { FC } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalCard from "./AnimalCard";
import { selectShiftId, useSelector } from "@/lib/redux";
import EndShiftButton from "./EndShiftButton";

interface AnimalDataProps {
  animals: Card[];
  widthClass: string;
  settings: SettingsFormType;
}

const AnimalData: FC<AnimalDataProps> = ({ animals, widthClass, settings }) => {
  const shift = useSelector(selectShiftId);

  const animalsNotDone = animals.filter((a) => !a.isDone);
  const animalsDone = animals.filter((a) => a.isDone);

  return (
    <>
      {animalsNotDone.length !== 0 ? (
        <ul className="w-full md:my-4">
          {animalsNotDone.map((animal) => (
            <li key={animal.id} className="m-2">
              <AnimalCard
                isShift={Boolean(shift)}
                animal={animal}
                detailWidth={widthClass}
                settings={settings}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col px-2 py-4">
          <span className="text-center font-extrabold">Wszystko zrobione!</span>
          <EndShiftButton />
        </div>
      )}
      {animalsDone.length !== 0 && (
        <>
          <h2 className="font-extrabold opacity-50 ml-2 mt-5">Zrobione</h2>
          <ul>
            {animalsDone.map((animal) => (
              <li key={animal.id} className="m-2">
                <AnimalCard
                  isShift={Boolean(shift)}
                  animal={animal}
                  detailWidth={widthClass}
                  settings={settings}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default AnimalData;

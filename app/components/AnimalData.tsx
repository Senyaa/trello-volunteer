"use client";

import { FC } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalCard from "./AnimalCard";
import { selectShiftId, useSelector } from "@/lib/redux";

interface AnimalDataProps {
  animals: Card[];
  settings: SettingsFormType;
}

const AnimalData: FC<AnimalDataProps> = ({ animals, settings }) => {
  const shift = useSelector(selectShiftId);

  const animalsNotDone = animals.filter((a) => !a.isDone);
  const animalsDone = animals.filter((a) => a.isDone);

  return (
    <>
      {animalsNotDone.length !== 0 && (
        <ul className="w-full md:my-4">
          {animalsNotDone.map((animal) => (
            <li key={animal.id} className="my-4">
              <AnimalCard
                isShift={Boolean(shift)}
                animal={animal}
                settings={settings}
              />
            </li>
          ))}
        </ul>
      )}
      {animalsDone.length !== 0 && (
        <>
          <h2 className="font-extrabold opacity-50 ml-2 mt-5">Zrobione</h2>
          <ul>
            {animalsDone.map((animal) => (
              <li key={animal.id} className="mx-2 my-4">
                <AnimalCard
                  isShift={Boolean(shift)}
                  animal={animal}
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

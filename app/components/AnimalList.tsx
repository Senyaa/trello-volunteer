"use client";
import { FC } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalData from "./AnimalData";
import { useSearchParams } from "next/navigation";
import EndShiftButton from "./shift/EndShiftButton";
import {
  selectCurrentShiftDone,
  selectShiftId,
  useDispatch,
  useSelector,
  userSlice,
} from "@/lib/redux";

interface AnimalListProps {
  animals: Card[];
  settings: SettingsFormType;
  allCatsCount: number;
}

const AnimalList: FC<AnimalListProps> = ({
  animals,
  settings,
  allCatsCount,
}) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const shift = useSelector(selectShiftId);
  const done = useSelector(selectCurrentShiftDone);

  const room = searchParams.get("room");
  dispatch(userSlice.actions.setAnimalsToDo(allCatsCount));

  if (animals.length === 0) {
    return <div className="p-4">Nie znaleziono zwierzaków.</div>;
  }

  const getWidthClass = () => {
    const animalDetailsCount =
      Object.values(settings).filter(Boolean).length - 1;

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

  const headerDetails = () => {
    if (Object.values(settings).length < 2) return null;
    return (
      <>
        {settings.medsEnabled && <div className={widthClass}>💊 Leki</div>}
        {settings.testsEnabled && <div className={widthClass}>🩸 Testy</div>}
        {settings.statusEnabled && <div className={widthClass}>🏠 Status</div>}
        {settings.personalityEnabled && (
          <div className={widthClass}>😈 Charakter</div>
        )}
        {settings.castrationEnabled && (
          <div className={widthClass}>✂️ Kastracja</div>
        )}
      </>
    );
  };

  return (
    <div className="mb-16 md:mb-0">
      {shift && done === allCatsCount && (
        <div className="flex flex-col px-2 py-4 bg-neutral-100 m-2 rounded-md">
          <p className="text-center">
            <span className="font-extrabold mb-2 block">
              Wszystko {room && "tu "}zrobione!
            </span>
            {room && (
              <>
                <span>
                  Sprawdź inne pomieszczenia uzywając selektora w prawym górnym
                  rogu
                </span>
                <span className="my-2 block">lub</span>
              </>
            )}
          </p>
          <EndShiftButton />
        </div>
      )}
      <div className="hidden z-10 md:flex bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 mx-2 mt-2 gap-2 border-2 border-solid dark:border-black">
        <div className="shrink-0 w-[12rem]">Imię</div>
        <div className="shrink-0 w-[12rem]">Uwagi</div>

        <div className="flex w-full gap-2">
          <div className={widthClass}>🍽 Karma</div>
          {headerDetails()}
        </div>
        <div className="w-[3rem]">Trello</div>
      </div>
      <AnimalData
        animals={animals}
        widthClass={widthClass}
        settings={settings}
      />
    </>
  );
};

export default AnimalList;

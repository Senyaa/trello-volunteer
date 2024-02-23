"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalData from "./AnimalData";
import { useSearchParams } from "next/navigation";
import EndShiftButton from "./shift/EndShiftButton";
import {
  selectCurrentShiftDoneCount,
  selectCurrentShiftDoneIds,
  selectShiftId,
  useDispatch,
  useSelector,
  userSlice,
} from "@/lib/redux";
import Input from "./ui/Input";
import { getDetailsHeaders } from "../helpers/details";
import Search from "./Search";

interface AnimalListProps {
  animals: Card[];
  settings: SettingsFormType;
  allCats: Card[];
}

const AnimalList: FC<AnimalListProps> = ({ animals, settings, allCats }) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const shift = useSelector(selectShiftId);
  const doneCount = useSelector(selectCurrentShiftDoneCount);
  const isDoneIds = useSelector(selectCurrentShiftDoneIds);

  const room = searchParams.get("room");

  useEffect(() => {
    dispatch(userSlice.actions.setAnimalsToDo(allCats.length));
    dispatch(
      userSlice.actions.setAnimalsIdsDone(
        allCats.filter((c) => c.isDone).map((c) => c.id)
      )
    );
  }, [allCats, dispatch]);

  const animalsLocalDone = useMemo(
    () => animals.map((a) => ({ ...a, isDone: isDoneIds.includes(a.id) })),
    [animals, isDoneIds]
  );

  const [animalsDisplayed, setAnimalsDisplayed] = useState(animalsLocalDone);

  const headerDetails = () => {
    if (Object.values(settings).length < 2) return null;
    return (
      <>
        {getDetailsHeaders(settings).map((header) => {
          if (header.isEnabled)
            return <div key={header.plName} className="detail-cell">{`${header.icon} ${header.plName}`}</div>;
        })}
      </>
    );
  };

  if (animals.length === 0) {
    return <div className="p-4">Nie znaleziono zwierzaków.</div>;
  }

  const handleSearchInput = (e: any) => {
    if (e.target.value.length < 3) setAnimalsDisplayed(animalsLocalDone);
    const filtered = animalsLocalDone.filter((animal) => {
      return animal.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    setAnimalsDisplayed(filtered);
  };

  return (
    <div className="mb-16 md:mb-0">
      <div className="px-2">
       <Search onInput={handleSearchInput}/>
      </div>
      {shift && doneCount === allCats.length && (
        <div className="flex flex-col px-2 py-4 bg-neutral-100 dark:bg-neutral-900 m-2 rounded-md">
          <p className="text-center">
            <span className="font-extrabold mb-2 block">
              Wszystko {room && "tu "}zrobione!
            </span>
            {room && (
              <>
                <span>
                  Sprawdź inne pomieszczenia używając selektora w prawym górnym
                  rogu
                </span>
                <span className="my-2 block">lub</span>
              </>
            )}
          </p>
          <EndShiftButton classNames="mt-2" />
        </div>
      )}
      <div className="hidden z-10 md:flex bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 mx-2 mt-2 gap-2 border-2 border-solid dark:border-black">
        <div className="shrink-0 w-[12rem]">Imię</div>
        <div className="shrink-0 w-[12rem]">Uwagi</div>

        <div className="flex w-full gap-2">
          <div className="detail-cell">🍽 Karma</div>
          {headerDetails()}
        </div>
        <div className="w-[3rem]">Trello</div>
        {shift ? <div className="w-[3rem]">Dyżur</div> : null}
      </div>
      <AnimalData animals={animalsDisplayed} settings={settings} />
    </div>
  );
};

export default AnimalList;

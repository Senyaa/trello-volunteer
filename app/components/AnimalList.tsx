"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalData from "./AnimalData";
import { usePathname, useSearchParams } from "next/navigation";
import EndShiftButton from "./shift/EndShiftButton";
import {
  selectCurrentShiftDoneCount,
  selectCurrentShiftDoneIds,
  selectShiftId,
  useDispatch,
  useSelector,
  userSlice,
} from "@/lib/redux";
import { getDetailsHeaders } from "../helpers/details";
import Search from "./Search";
import Container from "./ui/Container";

interface AnimalListProps {
  animals: Card[];
  settings: SettingsFormType;
  allAnimals: Card[];
}

const AnimalList: FC<AnimalListProps> = ({ animals, settings, allAnimals }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const shift = useSelector(selectShiftId);
  const doneCount = useSelector(selectCurrentShiftDoneCount);
  const isDoneIds = useSelector(selectCurrentShiftDoneIds);

  const [searchValue, setSearchValue] = useState("");

  const room = searchParams.get("room");

  useEffect(() => {
    dispatch(userSlice.actions.setAnimalsToDo(allAnimals.length));
    dispatch(
      userSlice.actions.setAnimalsIdsDone(
        allAnimals.filter((c) => c.isDone).map((c) => c.id)
      )
    );
  }, [allAnimals, dispatch]);

  const animalsLocalDone = useMemo(
    () =>
      animals
        .map((a) => ({ ...a, isDone: isDoneIds.includes(a.id) }))
        .filter((animal) => {
          return animal.name
            .split("-")[0]
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        }),
    [animals, isDoneIds, searchValue]
  );

  const isDog = pathname.includes("dogs");

  const headerDetails = () => {
    if (Object.values(settings).length < 2) return null;
    return (
      <>
        {getDetailsHeaders(settings).map((header) => {
          const displayForType = header.onlyType
            ? pathname.includes(header?.onlyType)
            : true;
          if (header.isEnabled && displayForType)
            return (
              <div key={header.plName} className="detail-cell">{`${
                header.icon ? header.icon + " " : ""
              }${header.plName}`}</div>
            );
        })}
      </>
    );
  };

  if (animals.length === 0) {
    return <Container>Nie znaleziono zwierzaków.</Container>;
  }

  const handleSearchInput = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <>
      <Search inputValue={searchValue} onInput={handleSearchInput} />
      {!isDog && shift && doneCount === allAnimals.length && (
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
      <div className="hidden z-10 md:flex bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 mt-2 gap-2 border-2 border-solid dark:border-black">
        <div className="shrink-0 w-[12rem]">Imię</div>
        <div className="shrink-0 w-[12rem]">Uwagi</div>

        <div className="flex w-full gap-2">
          <div className="detail-cell">🍽 Karma</div>
          {headerDetails()}
        </div>
        {!pathname.includes("newbie") && (
          <>
            <div className="w-[3rem]">Trello</div>
            {!isDog && shift ? <div className="w-[3rem]">Dyżur</div> : null}
          </>
        )}
      </div>
      <AnimalData animals={animalsLocalDone} settings={settings} />
    </>
  );
};

export default AnimalList;

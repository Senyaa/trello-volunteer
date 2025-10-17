"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { SettingsFormType } from "../../(site)/protected/settings/SettingsForm";
import { Card } from "../../types/Card";
import AnimalData from "./AnimalData";
import { usePathname, useSearchParams } from "next/navigation";
import EndShiftButton from "../shift/EndShiftButton";
import {
  selectCurrentShiftDoneCount,
  selectCurrentShiftDoneIds,
  selectShiftId,
  useDispatch,
  useSelector,
  userSlice,
} from "@/lib/redux";
import Search from "../ui/Search";
import Container from "../ui/Container";
import AnimalListDesktopHeader from "./AnimalListDesktopHeader";
import RoomCleaned from "./RoomCleaned";

interface AnimalListProps {
  animals: Card[];
  settings: SettingsFormType;
  allAnimals: Card[];
}

const AnimalList: FC<AnimalListProps> = ({ animals, settings, allAnimals }) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const shift = useSelector(selectShiftId);
  const doneCount = useSelector(selectCurrentShiftDoneCount);
  const isDoneIds = useSelector(selectCurrentShiftDoneIds);

  const [searchValue, setSearchValue] = useState("");

  const room = searchParams.get("room");
  const isDog = pathname.includes("dogs");

  const isShiftAvailable = shift && !isDog;

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
            ?.split("-")[0]
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        }),
    [animals, isDoneIds, searchValue]
  );

  if (animals.length === 0) {
    return <Container>Nie znaleziono zwierzaków.</Container>;
  }

  const handleSearchInput = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <>
      <Search inputValue={searchValue} onInput={handleSearchInput} />
      {isShiftAvailable && doneCount === allAnimals.length && (
        <RoomCleaned room={room}/>
      )}
      <div className="relative">
        <AnimalListDesktopHeader
          settings={settings}
          isShift={Boolean(isShiftAvailable)}
        />
        <AnimalData animals={animalsLocalDone} settings={settings} />
      </div>
    </>
  );
};

export default AnimalList;

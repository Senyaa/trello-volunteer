"use client";

import { useState } from "react";
import { initialSettingsForm } from "../(site)/protected/settings/SettingsForm";
import { Card } from "../types/Card";
import AnimalCard from "./AnimalCard";
import Search from "./Search";

const DogsData = ({ allDogs }: { allDogs: Card[] }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = (newValue: string) => {
    setSearchValue(newValue);
  };

  const dogsToDisplay = allDogs.filter((animal) => {
    return animal.name
      .split("-")[0]
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
  });

  return (
    <>
      <Search inputValue={searchValue} onInput={handleSearchInput} />
      {dogsToDisplay.map((dog) => {
        return (
          <div key={dog.id} className="mb-2">
            <AnimalCard
              animal={dog}
              settings={initialSettingsForm}
              isShift={false}
            />
          </div>
        );
      })}
    </>
  );
};
export default DogsData;

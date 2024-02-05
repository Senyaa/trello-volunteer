"use client";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { checkAnimalAsDone } from "@/actions/checkAnimalAsDone";

interface ShiftCheckboxProps {
  animalID: string;
  isDone: boolean;
  classes?: string;
}

const ShiftCheckbox: FC<ShiftCheckboxProps> = ({
  animalID,
  isDone,
  classes,
  
}) => {
  const checkAnimal = async () => {
    await checkAnimalAsDone("cats", animalID, !isDone);
  };

  return (
    <button
      onClick={checkAnimal}
      className={`w-7 h-7 p-1 border-solid border-2 border-green-800 rounded-md group hover:animate-[wiggle_1s_ease-in-out_infinite] ${
        isDone ? "bg-green-800" : "bg-neutral-200 dark:bg-neutral-800"
      } ${classes}`}
    >
      <FontAwesomeIcon
        icon={faCheck}
        className={`hidden text-neutral-200 group-hover:inline group-hover:text-green-800  hover:animate-[wiggle_1s_ease-in-out_infinite] ${
          isDone ? "inline" : "text-neutral-200 dark:text-neutral-800"
        }`}
      />
    </button>
  );
};

export default ShiftCheckbox;

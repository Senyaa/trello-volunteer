"use client";

import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { checkAnimalAsDone } from "@/actions/checkAnimalAsDone";
import { useDispatch, userSlice } from "@/lib/redux";

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
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const checkAnimal = async () => {
    setIsLoading(true);
    await checkAnimalAsDone("cats", animalID, !isDone);
    dispatch(userSlice.actions.checkAnimal(!isDone));
    setIsLoading(false);
  };

  return (
    <button
      onClick={checkAnimal}
      className={`w-7 h-7 p-1 border-solid border-2 border-green-800 rounded-md group hover:animate-[wiggle_1s_ease-in-out_infinite] ${
        isDone ? "bg-green-800" : "bg-transparent dark:bg-neutral-800"
      } ${classes}`}
    >
      {isLoading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className={`hidden text-neutral-200 group-hover:inline group-hover:text-green-800  animate-spin ${
            isDone ? "inline" : "text-neutral-200 dark:text-neutral-800"
          }`}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCheck}
          className={`hidden text-neutral-200 group-hover:inline group-hover:text-green-800  hover:animate-[wiggle_1s_ease-in-out_infinite] ${
            isDone ? "inline" : "text-transparent"
          }`}
        />
      )}
    </button>
  );
};

export default ShiftCheckbox;

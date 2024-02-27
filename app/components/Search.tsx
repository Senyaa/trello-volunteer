import { FC, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  inputValue: string;
  onInput: (e: string) => void;
}

const Search: FC<SearchProps> = ({ inputValue, onInput }) => {

  return (
    <>
      <FontAwesomeIcon icon={faSearch} className="absolute left-5 mt-2 z-10" />
      <input
        type="text"
        placeholder="Szukaj..."
        onChange={(e) => onInput(e.target.value)}
        value={inputValue}
        id="search"
        className="rounded-md pb-1 pt-2 pr-2 pl-10 dark:text-white bg-neutral-200 dark:bg-neutral-800 w-full relative active:outline-none"
      />
      <button
        onClick={() => onInput("")}
        className="absolute right-5 mt-2"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </>
  );
};

export default Search;

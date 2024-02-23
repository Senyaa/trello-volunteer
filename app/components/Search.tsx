import { FC, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  onInput: (e: string) => void;
}

const Search: FC<SearchProps> = ({ onInput }) => {
  const [value, setValue] = useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
    onInput(newValue);
  };
  return (
    <>
      <FontAwesomeIcon icon={faSearch} className="absolute left-5 mt-2 z-10" />
      <input
        type="text"
        placeholder="Szukaj..."
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        id="search"
        className="rounded-md pb-1 pt-2 pr-2 pl-10 dark:text-white bg-neutral-200 dark:bg-neutral-800 w-full relative active:outline-none"
      />
      <button
        onClick={() => handleChange("")}
        className="absolute right-5 mt-2"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </>
  );
};

export default Search;

import { FC } from "react";
import Input from "./ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  onInput: (e: any) => void;
}

const Search: FC<SearchProps> = ({ onInput }) => {
  return (
    <Input
      placeholder="Szukaj..."
      id="search"
      onInput={onInput}
      icon={
        <FontAwesomeIcon icon={faSearch} className="absolute right-5 mt-2" />
      }
    />
  );
};

export default Search;

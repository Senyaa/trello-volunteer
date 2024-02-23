import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InputProps = {
  placeholder: string;
  label?: string;
  id: string;
  onInput: (e: any) => void;
};

const Input = ({ placeholder, label, id, onInput }: InputProps) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-xs">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onInput(e)}
        id={id}
        className="rounded-md py-1 pl-2 pr-7 text-white bg-neutral-800 w-full relative active:outline-none"
      />
      <FontAwesomeIcon icon={faSearch} className="absolute right-5 mt-2" />
    </>
  );
};

export default Input;

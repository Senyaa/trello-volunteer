import { ReactNode } from "react";

type InputProps = {
  placeholder: string;
  id: string;
  label?: string;
  icon?: ReactNode;
  onInput: (e: any) => void;
};

const Input = ({ placeholder, label, id, onInput, icon }: InputProps) => {
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
        className="rounded-md py-1 px-2 dark:text-white bg-neutral-200 dark:bg-neutral-800 w-full active:outline-none"
      />
      {icon}
    </>
  );
};

export default Input;

import { ChangeEventHandler, ReactNode } from "react";

type InputProps = {
  placeholder?: string;
  id: string;
  value: string;
  label?: string;
  icon?: ReactNode;
  classes?: string
  onInput: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  placeholder,
  label,
  id,
  onInput,
  icon,
  classes,
  value,
}: InputProps) => {
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
        onChange={onInput}
        value={value}
        id={id}
        className={`rounded-md py-1 px-2 dark:text-white bg-neutral-200 dark:bg-neutral-800 active:outline-none ${classes}`}
      />
      {icon}
    </>
  );
};

export default Input;

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  label: string | ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  primary?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  classes?: string;
  iconRight?: ReactNode;
}

const Button = ({
  label,
  href,
  onClick,
  classes,
  type = "button",
  disabled = false,
  primary = true,
  iconRight,
}: ButtonProps) => {
  const primaryBtnClasses = `${
    disabled ? "opacity-80" : "opacity-100 hover:bg-green-900"
  } bg-green-800 text-white`;
  const secondaryBtnClasses = `${
    disabled ? "opacity-80" : "opacity-100 hover:bg-green-800 hover:text-white"
  } bg-transparent border-green-800 border-2 text-white `;
  
  if (href)
    return (
      <Link
        href={href}
        className={`${
          primary ? primaryBtnClasses : secondaryBtnClasses
        } rounded-md py-2 px-4 ease-in-out ${classes}`}
      >
        {label}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${
        primary ? primaryBtnClasses : secondaryBtnClasses
      } rounded-md py-2 px-4 ease-in-out ${classes}`}
      onClick={disabled ? undefined : onClick}
    >
      {label}
      {iconRight}
    </button>
  );
};

export default Button;

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  label: string | ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  level?: "primary" | "secondary" | "terinary";
  outlined?: boolean;
  disabled?: boolean;
  classes?: string;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  isLoading?: boolean;
  color?: "green" | "grey";
}

const Button = ({
  label,
  href,
  onClick,
  classes,
  type = "button",
  disabled = false,
  level = "primary",
  iconRight,
  iconLeft,
  isLoading = false,
  color = "green",
}: ButtonProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "grey": {
        if (level === "primary") {
          return `${
            disabled ? "opacity-80" : "opacity-100 hover:bg-green-700"
          } bg-neutral-200 dark:bg-neutral-700 hover:text-white`;
        } else if (level === "secondary") {
          return `${
            disabled
              ? "opacity-80"
              : "opacity-100 hover:bg-green-800 hover:text-white"
          } bg-transparent border-neutral-400 dark:border-neutral-200 border text-neutral-400 dark:text-neutral-200`;
        } else {
          return `${disabled ? "opacity-80" : "opacity-100"} bg-transparent`;
        }
      }
      default:
        if (level === "primary") {
          return `${
            disabled ? "opacity-80" : "opacity-100 hover:bg-green-900"
          } bg-green-800 text-white`;
        } else if (level === "secondary") {
          return `${
            disabled
              ? "opacity-80"
              : "opacity-100 hover:bg-green-800 hover:text-white"
          } bg-transparent border-green-800 border-2 dark:text-white`;
        } else {
          return `${
            disabled ? "opacity-80" : "opacity-100"
          } bg-transparent text-green-700 `;
        }
    }
  };

  if (href)
    return (
      <Link
        href={href}
        className={`${getColorClasses()} rounded-md py-2 px-4 ease-in-out ${classes}`}
      >
        {iconLeft}
        {label}
        {iconRight}
      </Link>
    );
  return (
    <button
      disabled={disabled || isLoading}
      type={type}
      className={`${getColorClasses()} rounded-md py-2 px-4 ease-in-out ${classes} `}
      onClick={disabled || isLoading ? undefined : onClick}
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      ) : (
        <>
          {iconLeft}
          {label}
          {iconRight}
        </>
      )}
    </button>
  );
};

export default Button;

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
  color?: "green" | "grey";
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
  color = "green",
}: ButtonProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "grey": {
        if (primary) {
          return `${
            disabled ? "opacity-80" : "opacity-100 hover:bg-green-900"
          } bg-neutral-200 dark:bg-neutral-700 dark:text-white`;
        } else {
          return `${
            disabled
              ? "opacity-80"
              : "opacity-100 hover:bg-green-800 hover:text-white"
          } bg-transparent border-neutral-400 dark:border-neutral-200 border text-neutral-400 dark:text-neutral-200`;
        }
      }
      default:
        if (primary) {
          return `${
            disabled ? "opacity-80" : "opacity-100 hover:bg-green-900"
          } bg-green-800 text-white`;
        } else {
          return `${
            disabled
              ? "opacity-80"
              : "opacity-100 hover:bg-green-800 hover:text-white"
          } bg-transparent border-green-800 border-2 dark:text-white`;
        }
    }
  };

  if (href)
    return (
      <Link
        href={href}
        className={`${getColorClasses()} rounded-md py-2 px-4 ease-in-out ${classes}`}
      >
        {label}
        {iconRight}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${getColorClasses()} rounded-md py-2 px-4 ease-in-out ${classes}`}
      onClick={disabled ? undefined : onClick}
    >
      {label}
      {iconRight}
    </button>
  );
};

export default Button;

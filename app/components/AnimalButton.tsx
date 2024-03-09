import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";

interface AnimalButtonProps {
  link: string;
  label: string;
  icon: IconDefinition;
  classes?: string;
}

const AnimalButton: FC<AnimalButtonProps> = ({
  link,
  label,
  icon,
  classes,
}) => {
  return (
    <Link
      href={link}
      className={`bg-green-900 text-white px-4 py-8 rounded-md h-[200px] w-full md:h-[400px] md:w-[400px] group ${classes}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon
          icon={icon}
          className="mb-4 group-hover:-translate-y-2 ease-in-out delay-75"
        />
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default AnimalButton;

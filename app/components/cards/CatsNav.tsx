"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";

interface CatsNavProps {
  animalListLength: number;
  currentRoom?: string;
  route?: string;
}

const options = [
  { label: "Wszystkie", value: "" },
  { label: "Kwarantanna", value: "quarantine" },
  { label: "Górna Kociarnia", value: "uppercatroom" },
  { label: "Dolna Kociarnia", value: "lowercatroom" },
];

const CatsNav: FC<CatsNavProps> = ({
  animalListLength,
  currentRoom,
  route = "/protected/animals/cats",
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-end mb-2">
      <h1 className="uppercase m-2">{`Koty (${animalListLength})`}</h1>

      <div className="flex items-end">
        {route.includes("newbie") ? null : (
          <Button
            href="/protected/settings"
            classes="px-2 mr-2"
            color="grey"
            label={<span className="hidden md:inline">Pola</span>}
            iconRight={<FontAwesomeIcon icon={faGear} className="md:ml-2" />}
          />
        )}
        <div className="flex flex-col">
          <label htmlFor="cats-nav" className="text-xs mb-0">
            Miejsce
          </label>
          <select
            className="rounded-md py-3 pl-2 pr-7 bg-neutral-200 dark:text-white dark:bg-neutral-900"
            name="cats-nav"
            id="cats-nav"
            onChange={(e) =>
              router.push(
                `${route}${e.target.value ? `?room=${e.target.value}` : ""}`
              )
            }
            value={currentRoom?.toLocaleLowerCase()}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CatsNav;

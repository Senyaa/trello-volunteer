"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Button from "./ui/Button";

interface CatsNavProps {
  current?: string;
}

const options = [
  { label: "Wszystkie", value: "" },
  { label: "Kwarantanna", value: "quarantine" },
  { label: "Górna Kociarnia", value: "uppercatroom" },
  { label: "Dolna Kociarnia", value: "lowercatroom" },
];

const CatsNav: FC<CatsNavProps> = ({ current }) => {
  const router = useRouter();

  return (
    <div className="flex items-end">
      <Button
        href="/protected/settings"
        classes="px-2 mr-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white hover:text-white"
        label="Pola"
        iconRight={<FontAwesomeIcon icon={faGear} className="ml-2"/>}
      />
      <div className="flex flex-col">
        <label htmlFor="cats-nav" className="text-xs mb-0">
          Miejsce
        </label>
        <select
          className="rounded-md py-3 pl-2 pr-7 bg-neutral-200 dark:text-white dark:bg-neutral-900"
          name="cats-nav"
          id="cats-nav"
          onChange={(e) =>
            router.push(`/protected/animals/cats/${e.target.value}`)
          }
          value={current?.toLocaleLowerCase()}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CatsNav;

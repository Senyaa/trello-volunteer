"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Button from "./ui/Button";
import StartShiftButton from "./StartShiftButton";
import { selectShiftId, useSelector } from "@/lib/redux";

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
  const shift = useSelector(selectShiftId);

  return (
    <div className="flex items-end">
      <div className="mr-2 ">
        {Boolean(shift) ? (
          <div className="bg-green-700 text-sm rounded-lg px-2 mb-2">
            trwa dyżur
          </div>
        ) : (
          <StartShiftButton shiftType="cats" />
        )}
      </div>
      <Button
        href="/protected/settings"
        classes="px-2 mr-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white hover:text-white"
        label="Pola"
        iconRight={<FontAwesomeIcon icon={faGear} className="ml-2" />}
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
            router.push(
              `/protected/animals/cats${
                e.target.value ? `?room=${e.target.value}` : ""
              }`
            )
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

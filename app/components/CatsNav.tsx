"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

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
    <div>
      <Link href="/protected/settings" className="px-2">
        <FontAwesomeIcon icon={faGear} />
      </Link>

      <select
        className="rounded-md py-1 pl-2 pr-7 bg-neutral-200 dark:text-white dark:bg-neutral-800"
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
  );
};

export default CatsNav;

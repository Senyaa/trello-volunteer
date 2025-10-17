import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface MenuItemProps {
  link: string;
  label: string;
  icon?: ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ link, label, icon }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={link}
        className={`${
          pathname.includes(link)
            ? "text-green-700 dark:text-white"
            : "dark:text-neutral-400"
        } flex flex-col justify-center items-center px-4`}
      >
        {icon}
        <div className="text-xs md:text-base mt-1">{label}</div>
      </Link>
    </li>
  );
};

export default MenuItem;

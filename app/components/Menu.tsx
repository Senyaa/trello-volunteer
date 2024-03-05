"use client";
import {
  faCat,
  faHeart,
  faHome,
  faLeaf,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShiftButton from "./shift/ShiftButton";
import { useSelector } from "react-redux";
import { selectShiftId } from "@/lib/redux";

const Menu = () => {
  const pathname = usePathname();

  const shiftId = useSelector(selectShiftId);

  return (
    <div className="fixed bottom-0 pt-2 pb-1  md:pb-2 px-4 md:px-8 bg-white dark:bg-neutral-900 w-full z-50 border-t border-solid border-neutral-100 dark:border-neutral-900">
      <ul className="w-full flex justify-between">
        <li>
          <Link
            href="/protected/home"
            className={`${
              pathname.includes("/protected/home") ? "text-green-700" : ""
            } flex flex-col justify-center`}
          >
            <FontAwesomeIcon icon={faHome} />
            <div className="text-xs mt-1">Start</div>
          </Link>
        </li>
        <li>
          <Link
            href="/protected/animals/cats"
            className={`${
              pathname.includes("/protected/animals/cats")
                ? "text-green-700"
                : ""
            } flex flex-col justify-center`}
          >
            <FontAwesomeIcon icon={faCat} />
            <div className="text-xs mt-1">Zwierzęta</div>
          </Link>
        </li>
        <li className="w-10">
            <ShiftButton isShift={Boolean(shiftId)} />

        </li>
        <li>
          <Link
            href="/protected/newbie"
            className={`${
              pathname.includes("/protected/newbie") ? "text-green-700" : ""
            } flex flex-col justify-center`}
          >
            <FontAwesomeIcon icon={faLeaf} />
            <div className="text-xs mt-1">Świeżynka</div>
          </Link>
        </li>
        <li>
          <Link
            href="/protected/profile"
            className={`${
              pathname.includes("/protected/profile") ? "text-green-700" : ""
            } flex flex-col justify-center`}
          >
            <FontAwesomeIcon icon={faUser} />
            <div className="text-xs mt-1">Profil</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Menu;

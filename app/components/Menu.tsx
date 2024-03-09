"use client";
import {
  faHome,
  faLeaf,
  faPaw,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShiftButton from "./shift/ShiftButton";
import { useSelector } from "react-redux";
import { selectShiftId } from "@/lib/redux";
import MenuItem from "./MenuItem";
import { isMobile } from "../helpers/isMobile";

const Menu = () => {
  const shiftId = useSelector(selectShiftId);

  return (
    <div className="fixed md:static bottom-0 pt-2 pb-1 md:pb-2 px-4 md:px-8 bg-white dark:bg-neutral-900 w-full z-50 border-t border-solid border-neutral-100 dark:border-neutral-900">
      <ul className="w-full flex justify-between md:justify-end">
        <MenuItem
          label="Start"
          link="/protected/home"
          icon={isMobile() ? <FontAwesomeIcon icon={faHome} /> : undefined}
        />
        <MenuItem
          label="Zwierzęta"
          link="/protected/animals"
          icon={isMobile() ? <FontAwesomeIcon icon={faPaw} /> : undefined}
        />
        {isMobile() ? (
          <li className="w-10">
            <ShiftButton isShift={Boolean(shiftId)} />
          </li>
        ) : null}
        <MenuItem
          label="Świeżynka"
          link="/protected/newbie"
          icon={isMobile() ? <FontAwesomeIcon icon={faLeaf} /> : undefined}
        />
        <MenuItem
          label="Profil"
          link="/protected/profile"
          icon={isMobile() ? <FontAwesomeIcon icon={faUser} /> : undefined}
        />
      </ul>
    </div>
  );
};
export default Menu;

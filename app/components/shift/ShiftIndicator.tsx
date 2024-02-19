"use client";

import { FC, useEffect, useRef, useState } from "react";
import StartShiftButton from "./StartShiftButton";
import {
  selectCurrentShiftAll,
  selectCurrentShiftDoneCount,
  useSelector,
} from "@/lib/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import EndShiftButton from "./EndShiftButton";

interface ShiftIndicatorProps {
  isShift: boolean;
}
const ShiftIndicator: FC<ShiftIndicatorProps> = ({ isShift }) => {
  const allCount = useSelector(selectCurrentShiftAll);
  const doneCount = useSelector(selectCurrentShiftDoneCount);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative">
      {isMenuOpened ? (
        <div
          className="bg-neutral-100 shadow-md dark:bg-neutral-700 w-40 z-10 fixed bottom-12 right-0 mb-1"
          ref={menuRef}
        >
          <ul className="flex justify-center">
            <li>
              <EndShiftButton
                classNames="bg-transparent text-black hover:bg-transparent w-100"
                onEnd={() => setMenuOpened(false)}
              />
            </li>
          </ul>
        </div>
      ) : null}
      <div className="px-2 fixed md:static bottom-0 left-0 md:flex md:bg-transparent bg-neutral-200 dark:bg-neutral-800 py-2 md:py-0 w-full md:w-auto opacity-100 z-30">
        {isShift ? (
          <>
            <div className="flex justify-between px-2 py-1">
              <span className="text-sm">{`trwa dyżur (${doneCount}/${allCount})`}</span>
              <button
                className="px-2"
                onClick={() => setMenuOpened(!isMenuOpened)}
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>

            <div className="bg-neutral-300 dark:bg-black rounded-full dark:text-white relative h-1">
              <div
                className="bg-green-700 absolute rounded-full transition ease-in-out duration-500 h-1"
                style={{ width: `${(doneCount / allCount) * 100}%` }}
              >
                &nbsp;
              </div>
            </div>
          </>
        ) : (
          <StartShiftButton shiftType="cats" />
        )}
      </div>
    </div>
  );
};

export default ShiftIndicator;

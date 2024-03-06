import { FC, useEffect, useRef, useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EndShiftButton from "./EndShiftButton";
import {
  selectCurrentShiftAll,
  selectCurrentShiftDoneCount,
  useSelector,
} from "@/lib/redux";
import StartShiftButton from "./StartShiftButton";
import Link from "next/link";

interface ShiftButtonProps {
  isShift: boolean;
}

const ShiftButton: FC<ShiftButtonProps> = ({isShift}) => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const allCount = useSelector(selectCurrentShiftAll);
  const doneCount = useSelector(selectCurrentShiftDoneCount);
  const progress = (doneCount / allCount) * 100;

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMenuOpened) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpened]);

  const size = 50;
  const stroke = 4;
  const center = size / 2;
  const r = center - stroke;
  const circumference = Math.ceil(2 * Math.PI * r);
  const offset = Math.ceil(circumference * ((100 - progress) / 100));

  return (
    <>
      {isMenuOpened ? (
        <div
          className="bg-neutral-100 shadow-md dark:bg-neutral-700 w-50 z-10 fixed bottom-14 mb-2"
          ref={menuRef}
        >
          <ul className="flex flex-col">
            {isShift && (
              <>
                <li><Link href="/protected/report" className="py-2 px-4">Podejrzyj raport</Link></li>
              </>
            )}
            <li>
              {isShift ? (
                <EndShiftButton
                  classNames="w-100"
                  onEnd={() => setMenuOpened(false)}
                />
              ) : (
                <StartShiftButton shiftType="cats" onStart={() => setMenuOpened(false)}/>
              )}
            </li>
          </ul>
        </div>
      ) : null}
      <div
        className={`${
          isShift ? "flex items-center justify-center" : ""
        } absolute bottom-3 h-full`}
      >
        {isShift && (
          <svg width={size} height={size} className="-rotate-90">
            <circle
              r={r}
              cx={center}
              cy={center}
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="4px"
            ></circle>
            <circle
              r={r}
              cx={center}
              cy={center}
              fill="transparent"
              stroke="#16813d"
              strokeWidth={stroke}
              strokeDasharray={`${circumference}px`}
              strokeDashoffset={`${offset}px`}
            ></circle>
          </svg>
        )}
        <div
          onClick={() => setMenuOpened(true)}
          className={`${
            isShift
              ? "bg-white dark:bg-neutral-900 text-green-800 dark:text-white"
              : "bg-green-800 text-white"
          } absolute rounded-full h-10 w-10 p-2 flex items-center justify-center text-center`}
        >
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </>
  );
};

export default ShiftButton;

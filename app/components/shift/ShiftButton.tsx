import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  faHeart,
  faReceipt,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  selectCurrentShiftAll,
  selectCurrentShiftDoneCount,
  selectShiftId,
  useSelector,
} from "@/lib/redux";
import getShiftById from "@/actions/getShiftById";
import EndShiftButton from "./EndShiftButton";
import StartShiftButton from "./StartShiftButton";
import ShiftNoteModal from "./ShiftNoteModal";
import Button from "../ui/Button";

interface ShiftButtonProps {
  isShift: boolean;
}

const ShiftButton: FC<ShiftButtonProps> = ({ isShift }) => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isNoteModalOpened, setIsNoteModalOpened] = useState(false);
  const [noteValue, setNoteValue] = useState("");

  const shiftId = useSelector(selectShiftId);
  const allCount = useSelector(selectCurrentShiftAll);
  const doneCount = useSelector(selectCurrentShiftDoneCount);
  const progress = (doneCount / allCount) * 100;

  const getShiftNote = async () => {
    const shift = await getShiftById(shiftId);
    setNoteValue(shift?.description || "");
  };

  const menuRef = useRef<HTMLDivElement>(null);

  //TODO: extract
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
      {isShift && isNoteModalOpened && (
        <ShiftNoteModal
          note={noteValue}
          onClose={(value) => {
            setNoteValue(value);
            setIsNoteModalOpened(false);
          }}
        />
      )}
      {isMenuOpened ? (
        <div
          className="bg-neutral-100 shadow-md dark:bg-neutral-700 w-50 z-10 fixed bottom-14 mb-2 rounded-md"
          ref={menuRef}
        >
          <ul className="flex flex-col">
            {isShift && (
              <>
                <li className="py-2 px-1">
                  <div className="relative">
                    {noteValue && (
                      <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-700 z-10 left-5 mr-4 mt-1"></span>
                    )}
                    <Button
                      label="Notatka do dyżuru"
                      onClick={async () => {
                        await getShiftNote();
                        setMenuOpened(false);
                        setIsNoteModalOpened(true);
                      }}
                      iconLeft={
                        <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
                      }
                      classes="h-7 pt-1 px-[11px] text-sm dark:text-white"
                      level="terinary"
                      color="grey"
                    />
                  </div>
                </li>
                <li>
                  <Link
                    href="/protected/report"
                    className="py-2 px-4 text-sm text-center"
                    onClick={() => setMenuOpened(false)}
                  >
                    <FontAwesomeIcon icon={faReceipt} className="mr-2" />
                    Podejrzyj raport
                  </Link>
                </li>
              </>
            )}
            <li>
              {isShift ? (
                <EndShiftButton
                  classNames="w-100 text-sm"
                  onEnd={() => setMenuOpened(false)}
                />
              ) : (
                <StartShiftButton
                  shiftType="cats"
                  classes="w-100 text-sm"
                  onStart={() => setMenuOpened(false)}
                />
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

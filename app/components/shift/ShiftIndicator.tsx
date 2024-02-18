"use client";

import { FC } from "react";
import StartShiftButton from "./StartShiftButton";
import {
  selectCurrentShiftAll,
  selectCurrentShiftDoneCount,
  useSelector,
} from "@/lib/redux";

interface ShiftIndicatorProps {
  isShift: boolean;
}
const ShiftIndicator: FC<ShiftIndicatorProps> = ({ isShift }) => {
  const allCount = useSelector(selectCurrentShiftAll);
  const doneCount = useSelector(selectCurrentShiftDoneCount);

  return (
    <div className="px-2 fixed md:static bottom-0 left-0 md:flex md:bg-transparent bg-neutral-200 dark:bg-neutral-800 py-2 md:py-0 w-full md:w-auto opacity-100 z-30">
      {isShift ? (
        <>
          <span className="text-sm px-2 py-1">{`trwa dyżur (${doneCount}/${allCount})`}</span>

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
  );
};

export default ShiftIndicator;

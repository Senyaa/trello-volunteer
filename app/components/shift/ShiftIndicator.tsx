'use client'

import { FC } from "react";
import StartShiftButton from "./StartShiftButton";
import { selectCurrentShiftAll, selectCurrentShiftDone, useSelector } from "@/lib/redux";

interface ShiftIndicatorProps {
  isShift: boolean;
}
const ShiftIndicator: FC<ShiftIndicatorProps> = ({ isShift }) => {
const all = useSelector(selectCurrentShiftAll)
const done = useSelector(selectCurrentShiftDone)

  return (
    <div className="px-2 fixed md:static bottom-0 left-0 md:flex md:bg-transparent bg-neutral-200 dark:bg-neutral-800 py-2 md:py-0 w-full md:w-auto opacity-100 z-30">
      {isShift ? (
        <div className="bg-green-700 text-sm rounded-full px-2 py-1 text-center text-white">
          {`trwa dyżur (${done}/${all})`}
        </div>
      ) : (
        <StartShiftButton shiftType="cats" />
      )}
    </div>
  );
};

export default ShiftIndicator;

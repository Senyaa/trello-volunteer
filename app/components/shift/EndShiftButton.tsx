"use client";

import { FC } from "react";
import Button from "../ui/Button";
import { endShift } from "@/actions/endShift";
import { selectShiftId, useDispatch, useSelector, userSlice } from "@/lib/redux";
import { useRouter } from "next/navigation";

interface EndShiftButtonProps {
  classNames?: string;
  onEnd?: () => void;
}

const EndShiftButton: FC<EndShiftButtonProps> = ({ classNames, onEnd }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const shiftId = useSelector(selectShiftId);

  const handleEndShift = async () => {
    const finishedShift = shiftId;
    await endShift();
    dispatch(userSlice.actions.setShiftId(""));
    dispatch(userSlice.actions.setAnimalsIdsDone([]));
    dispatch(userSlice.actions.setAnimalsToDo(0));
    if (onEnd) {
      onEnd();
    }
    router.push(`/protected/shift-finished?shiftId=${finishedShift}`);
  };

  return (
    <Button
      label="Zakończ dyżur"
      level="terinary"
      color="grey"
      onClick={handleEndShift}
      classes={classNames}
    />
  );
};

export default EndShiftButton;

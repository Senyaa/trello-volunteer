"use client";

import { FC } from "react";
import Button from "../ui/Button";
import { endShift } from "@/actions/endShift";
import { useDispatch, userSlice } from "@/lib/redux";
import { useRouter } from "next/navigation";

interface EndShiftButtonProps {
  classNames?: string;
  onEnd?: () => void;
}

const EndShiftButton: FC<EndShiftButtonProps> = ({ classNames, onEnd }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleEndShift = async () => {
    await endShift();
    dispatch(userSlice.actions.setShiftId(""));
    dispatch(userSlice.actions.setAnimalsIdsDone([]));
    dispatch(userSlice.actions.setAnimalsToDo(0));
    if (onEnd) {
      onEnd();
    }
    router.push("/protected/shift-finished");
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

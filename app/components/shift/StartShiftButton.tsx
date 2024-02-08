"use client";

import { FC } from "react";
import Button from "../ui/Button";
import { startShift } from "@/actions/startShift";
import { useDispatch, userSlice } from "@/lib/redux";

interface StartShiftButtonProps {
  shiftType: string;
}

const StartShiftButton: FC<StartShiftButtonProps> = ({ shiftType }) => {
const dispatch = useDispatch();

  const handleStartShift = async () => {
    const newShift = await startShift(shiftType);
    dispatch(userSlice.actions.setShiftId(newShift.id));
  };

  return <Button label="Zacznij dyżur" onClick={handleStartShift} classes="w-full" />;
};

export default StartShiftButton;

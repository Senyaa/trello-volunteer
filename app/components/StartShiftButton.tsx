"use client";

import { FC } from "react";
import Button from "./ui/Button";
import { startShift } from "@/actions/startShift";

interface StartShiftButtonProps {
  shiftType: string;
}

const StartShiftButton: FC<StartShiftButtonProps> = ({ shiftType }) => {
  const handleStartShift = async () => {
    await startShift(shiftType);
  };

  return <Button label="Zacznij dyżur" onClick={handleStartShift} />;
};

export default StartShiftButton;

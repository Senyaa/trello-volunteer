"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, userSlice } from "@/lib/redux";
import { startShift } from "@/actions/startShift";
import Button from "../ui/Button";

interface StartShiftButtonProps {
  shiftType: string;
  onStart?: () => void;
  classes?: string;
}

const StartShiftButton: FC<StartShiftButtonProps> = ({
  shiftType,
  onStart,
  classes,
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleStartShift = async () => {
    const newShift = await startShift(shiftType);
    dispatch(userSlice.actions.setShiftId(newShift.id));
    if (onStart) {
      onStart();
    }
  };

  if (!pathname.includes(shiftType)) return null;

  return (
    <Button
      label="Zacznij dyżur"
      onClick={handleStartShift}
      classes={classes}
      level="terinary"
      color="grey"
    />
  );
};

export default StartShiftButton;

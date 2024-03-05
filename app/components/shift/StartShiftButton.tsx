"use client";

import { FC } from "react";
import Button from "../ui/Button";
import { startShift } from "@/actions/startShift";
import { useDispatch, userSlice } from "@/lib/redux";
import { usePathname } from "next/navigation";

interface StartShiftButtonProps {
  shiftType: string;
}

const StartShiftButton: FC<StartShiftButtonProps> = ({ shiftType }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleStartShift = async () => {
    const newShift = await startShift(shiftType);
    dispatch(userSlice.actions.setShiftId(newShift.id));
  };

  if (!pathname.includes(shiftType)) return null;

  return (
    <Button
      label="Zacznij dyżur"
      onClick={handleStartShift}
      classes="w-full"
      level="terinary"
      color="grey"
    />
  );
};

export default StartShiftButton;

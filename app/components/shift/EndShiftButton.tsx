"use client";

import { FC, } from "react";
import Button from "../ui/Button";
import { endShift } from "@/actions/endShift";
import { useDispatch, userSlice } from "@/lib/redux";

const EndShiftButton: FC = ( ) => {
  const dispatch = useDispatch()
  const handleEndShift = async () => {
    await endShift();
    dispatch(userSlice.actions.setShiftId(""))
    dispatch(userSlice.actions.setAnimalsDone(0))
    dispatch(userSlice.actions.setAnimalsToDo(0))
  };

  return <Button label="Zakończ dyżur" onClick={handleEndShift} classes="mt-2"/>;
};

export default EndShiftButton;

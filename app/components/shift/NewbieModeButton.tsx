"use client";

import { FC, useState } from "react";
import Button from "../ui/Button";
import {
  selectTrelloId,
  useDispatch,
  useSelector,
  userSlice,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { shareCards } from "@/actions/shareCards";
import { getSession } from "next-auth/react";

interface NewbieModeButtonProps {
  classNames?: string;
}

interface GuestView {
  userId: string;
  id: string;
  createdAt: Date | null;
  content: unknown;
  endsAt: Date;
}

const NewbieModeButton: FC<NewbieModeButtonProps> = ({ classNames }) => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  const [isShared, setIsShared] = useState<GuestView | null | undefined>(null);

  const trelloId = useSelector(selectTrelloId);
  const handleNewbieMode = async () => {
    const guestView = await shareCards(trelloId);
    setIsShared(guestView);
    // dispatch(userSlice.actions.setShiftId(""));
    // dispatch(userSlice.actions.setAnimalsIdsDone([]));
    // dispatch(userSlice.actions.setAnimalsToDo(0));
    // router.push("/protected/shift-finished");
  };

  return (
    <>
    {isShared ? null : <div>Zdecyduj co udostępnić i na jaki czas</div>}
      {isShared ? <div><div>{isShared.id}</div></div> : null}
      <Button
        label="Udostępnij świezynce"
        onClick={handleNewbieMode}
        classes={classNames}
      />
    </>
  );
};

export default NewbieModeButton;

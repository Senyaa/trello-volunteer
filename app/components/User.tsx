"use client";

import {
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSelector, userSlice } from "@/lib/redux";
import { selectTrelloId } from "@/lib/redux/slices/userSlice/selectors";
import { useEffect } from "react";

const User = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const trelloId = useSelector(selectTrelloId);

  useEffect(() => {
    if (status === "authenticated" && !trelloId) {
      dispatch(userSlice.actions.setTrelloId(session.user?.trelloId || ""));
    }
    if (status === "unauthenticated") {
      dispatch(userSlice.actions.setTrelloId(""));
    }
  }, [status, trelloId]);

  if (status === "authenticated" && trelloId) {
    return (
        <div className="text-extrabold">{session.user?.name}</div>
    );
  }

  if (status === "loading") {
    return <FontAwesomeIcon className="animate-spin" icon={faSpinner} />;
  }

  return null;
};

export default User;

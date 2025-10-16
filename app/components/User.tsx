"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSelector, userSlice } from "@/lib/redux";
import {
  selectTrelloId,
} from "@/lib/redux/slices/userSlice/selectors";
import { useEffect } from "react";

interface UserProps {
  userType?: "USER" | "ADMIN";
}

const User: React.FC<UserProps> = ({ userType = "USER" }) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const trelloId = useSelector(selectTrelloId);

  useEffect(() => {
    dispatch(userSlice.actions.setUserType(userType));

    if (status === "authenticated" && !trelloId) {
      dispatch(userSlice.actions.setTrelloId(session.user?.trelloId || ""));
    }
    if (status === "unauthenticated") {
      dispatch(userSlice.actions.setTrelloId(""));
      dispatch(userSlice.actions.setUserType("USER"));
    }
  }, [status, trelloId, userType, dispatch, session]);

  const adminIndicator = userType === "ADMIN" ? "✨" : "";

  if (status === "authenticated" && trelloId) {
    return (
      <div className="text-extrabold">
        {adminIndicator}
        {session.user?.name}
      </div>
    );
  }

  if (status === "loading") {
    return <FontAwesomeIcon className="animate-spin" icon={faSpinner} />;
  }

  return null;
};

export default User;

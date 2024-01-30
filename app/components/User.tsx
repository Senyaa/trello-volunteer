"use client";
import {
  faRightFromBracket,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import LoginButton from "./LoginButton";
import { useDispatch } from "react-redux";
import { useSelector, userSlice } from "@/lib/redux";
import { selectTrelloId } from "@/lib/redux/slices/userSlice/selectors";

const User = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const trelloId = useSelector(selectTrelloId);

  if (status === "loading") {
    return <FontAwesomeIcon className="animate-spin" icon={faSpinner} />;
  }

  if (status === "authenticated") {
    if (!trelloId) {
      dispatch(userSlice.actions.setTrelloId(session.user?.trelloId || ""));
    }

    return (
      <div className="flex">
        <div className="px-2">{session.user?.name}</div>
        <button className="px-2" onClick={() => signOut({ callbackUrl: "/" })}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    );
  } else {
    dispatch(userSlice.actions.setTrelloId(""));

    return null;
  }
};

export default User;

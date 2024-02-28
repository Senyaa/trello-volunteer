"use client"

import { signOut } from "next-auth/react";
import Button from "./ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const SignOutButton = () => {
  return (
    <Button
      color="grey"
      onClick={() => signOut({ callbackUrl: "/" })}
      label={
        <>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className="ml-2">Wyloguj się</span>
        </>
      }
    />
  );
};

export default SignOutButton;

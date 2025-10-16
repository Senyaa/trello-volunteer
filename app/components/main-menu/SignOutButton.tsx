"use client";

import { signOut } from "next-auth/react";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const SignOutButton = () => {
  return (
    <Button
      color="grey"
      onClick={() => signOut({ callbackUrl: "/" })}
      iconLeft={<FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />}
      label="Wyloguj się"
      classes="w-48"
    />
  );
};

export default SignOutButton;

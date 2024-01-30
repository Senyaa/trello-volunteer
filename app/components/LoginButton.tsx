"use client";

import { signIn } from "next-auth/react";
import Button from "./ui/Button";
import { FC, ReactNode } from "react";
import { MAIN_PAGE } from "../helpers/consts";

interface LoginButtonProps {
  label?: string;
  iconRight?: ReactNode;
  classes?: string;
}

const LoginButton: FC<LoginButtonProps> = ({
  label = "Zaloguj",
  iconRight,
  classes,
}) => {
  return (
    <Button
      classes={classes}
      label={label}
      onClick={() => signIn("trello", { callbackUrl: MAIN_PAGE })}
      iconRight={iconRight}
    />
  );
};

export default LoginButton;

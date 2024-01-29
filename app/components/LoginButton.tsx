"use client";

import { signIn } from "next-auth/react";
import Button from "./ui/Button";
import { FC, ReactNode } from "react";

interface LoginButtonProps {
  label?: string;
  iconRight?: ReactNode;
}

const LoginButton: FC<LoginButtonProps> = ({
  label = "Zaloguj",
  iconRight,
}) => {
  return (
    <Button
      label={label}
      onClick={() => signIn("trello", { callbackUrl: "/protected/home" })}
      iconRight={iconRight}
    />
  );
};

export default LoginButton;

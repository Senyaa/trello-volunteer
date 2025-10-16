"use client";

import { signIn } from "next-auth/react";
import Button from "./ui/Button";
import { FC, ReactNode, useState } from "react";
import { MAIN_PAGE } from "../helpers/consts";
import Link from "next/link";

interface LoginButtonProps {
  label?: string;
  iconRight?: ReactNode;
  classes?: string;
}

const LoginForm: FC<LoginButtonProps> = ({
  label = "Zaloguj",
  iconRight,
  classes,
}) => {

  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = () => {
    setIsLoading(true);
    signIn("trello", { callbackUrl: MAIN_PAGE });
  }

  return (
    <>
      <Button
        classes={classes}
        label={label}
        onClick={signInHandler}
        iconRight={iconRight}
        isLoading={isLoading}
      />
      <label htmlFor="privacy-policy" className="mt-5 block">
        <Link href="/privacy-policy" className="underline">
          Polityka prywatności
        </Link>
      </label>
    </>
  );
};

export default LoginForm;

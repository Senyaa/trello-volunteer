"use client";

import { signIn } from "next-auth/react";
import Button from "./ui/Button";
import { FC, ReactNode } from "react";
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
  return (
    <>
      <Button
        classes={classes}
        label={label}
        onClick={() => signIn("trello", { callbackUrl: MAIN_PAGE })}
        iconRight={iconRight}
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

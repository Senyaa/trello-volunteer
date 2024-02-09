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
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <label htmlFor="privacy-policy" className="mt-2">
        <input
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target?.checked)}
          type="checkbox"
          id="privacy-policy"
          className="accent-green-800 mr-2"
        />
        Zapoznałam/em się z{" "}
        <Link href="/privacy-policy" className="underline">
          polityką prywatności.
        </Link>
      </label>
      <Button
        classes={classes}
        disabled={!isChecked}
        label={label}
        onClick={() => signIn("trello", { callbackUrl: MAIN_PAGE })}
        iconRight={iconRight}
      />
    </>
  );
};

export default LoginForm;

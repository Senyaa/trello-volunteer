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
      <div className="mt-2">
        <input
          name="privacy-policy"
          id="privacy-policy"
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="privacy-policy" className="ml-2">
          Przeczytałam/em{" "}
          <Link href="/privacy-policy" className="underline">
            politykę prywatności
          </Link>
        </label>
      </div>
      <Button
        disabled={!isChecked}
        classes={classes}
        label={label}
        onClick={() => signIn("trello", { callbackUrl: MAIN_PAGE })}
        iconRight={iconRight}
      />
    </>
  );
};

export default LoginForm;

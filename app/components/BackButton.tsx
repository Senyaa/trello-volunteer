"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { FC } from "react";

interface BackButtonProps {
  classes?: string;
}

const BackButton: FC<BackButtonProps> = ({ classes = "w-full" }) => {
  const router = useRouter();
  return (
    <Button
      primary={false}
      classes={classes}
      label="< Wróć"
      onClick={() => router.back()}
    />
  );
};

export default BackButton;

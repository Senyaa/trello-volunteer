"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button primary={false} classes={"w-full"} label={"< Wróć"} onClick={() => router.back()} />
  );
};

export default BackButton;

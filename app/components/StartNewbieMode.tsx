"use client";

import Button from "./ui/Button";
import { shareCards } from "@/actions/shareCards";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const StartNewbieMode = () => {
  const session = useSession();
  const router = useRouter()

  const handleNewbieMode = async () => {
    const guestView = await shareCards(session.data?.user?.trelloId || "");
    router.push(`/protected/newbie/${guestView?.id}`);
  };

  return (
    <Button
      label="Udostępnij"
      onClick={handleNewbieMode}
      classes="w-full"
    />
  );
};
export default StartNewbieMode;

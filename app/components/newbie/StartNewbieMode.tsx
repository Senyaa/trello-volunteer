"use client";

import { shareCards } from "@/actions/shareCards";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Button from "../ui/Button";

const StartNewbieMode = () => {
  const session = useSession();
  const router = useRouter();

  const handleNewbieMode = async (type: "cats" | "dogs") => {
    const guestView = await shareCards(
      session.data?.user?.trelloId || "",
      type
    );
    router.push(`/protected/newbie/${guestView?.id}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <Button
        label="Udostępnij pieski"
        onClick={() => handleNewbieMode("dogs")}
        classes="w-full mb-2 md:mb-0 md:mr-2 md:w-64"
      />
      <Button
        label="Udostępnij kotki"
        onClick={() => handleNewbieMode("cats")}
        classes="w-full md:w-64"
      />
    </div>
  );
};
export default StartNewbieMode;

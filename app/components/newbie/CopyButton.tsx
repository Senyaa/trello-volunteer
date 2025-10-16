"use client"
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";
import Toast from "../ui/Toast";
import { useState } from "react";

const CopyButton = ({ content }: { content: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <button
        className="rounded-md bg-neutral-100 dark:bg-neutral-600 flex justify-center items-center p-3 ml-2"
        onClick={() => {
          navigator.clipboard.writeText(content);
        }}
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
      {createPortal(
        <Toast
          text="Skopiowano!"
          hide={() => setIsCopied(false)}
          isShown={isCopied}
        />,
        document.body
      )}
    </>
  );
};

export default CopyButton;

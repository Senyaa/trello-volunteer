import QRCode from "react-qr-code";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../ui/Button";
import Toast from "../ui/Toast";

interface ShareModalContentProps {
  newbieLink: string;
  expiresAt: string;
}

const ShareModalContent: FC<ShareModalContentProps> = ({
  newbieLink,
  expiresAt,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <span className="block text-sm mb-4">
        Ten link będzie działał przez 3 godziny, do {expiresAt}.
      </span>
      <div className="bg-white p-4 mb-4">
        <QRCode
          size={256}
          style={{ height: "256px", maxWidth: "100%", width: "100%" }}
          value={newbieLink}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="flex items-center mb-4">
        <span className="p-2 bg-neutral-100 dark:bg-neutral-600 rounded-md overflow-x-hidden text-nowrap select-all whitespace-nowrap">
          {newbieLink}
        </span>
        <button
          className="rounded-md bg-neutral-100 dark:bg-neutral-600 flex justify-center items-center p-3 ml-2"
          onClick={() => {
            navigator.clipboard.writeText(newbieLink);
            setIsCopied(true);
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      {createPortal(
        <Toast
          text="Link skopiowany!"
          hide={() => setIsCopied(false)}
          isShown={isCopied}
        />,
        document.body
      )}
    </>
  );
};

export default ShareModalContent;

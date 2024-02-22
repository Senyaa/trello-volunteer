import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../ui/Button";
import Toast from "../ui/Toast";

interface ShareModalContentProps {
  newbieLink: string;
  expiresAt: string
}

const ShareModalContent: FC<ShareModalContentProps> = ({ newbieLink, expiresAt }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <span className="block text-sm mb-4">
        Pod tym linkiem dane będą widoczne przez 3 godziny. (Do {expiresAt})
      </span>

      <div className="flex items-center">
        <span className="p-2 bg-neutral-600 rounded-md overflow-x-hidden text-nowrap select-all whitespace-nowrap">
          {newbieLink}
        </span>
        <button
          className="rounded-md bg-neutral-600 flex justify-center items-center p-3 ml-2"
          onClick={() => {
            navigator.clipboard.writeText(newbieLink);
            setIsCopied(true);
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          label="Udostępnij"
          onClick={() => navigator.share({ url: newbieLink })}
        />
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

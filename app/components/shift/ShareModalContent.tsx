import QRCode from "react-qr-code";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import Button from "../ui/Button";
import { isMobile } from "@/app/helpers/isMobile";
import CopyButton from "../CopyButton";

interface ShareModalContentProps {
  newbieLink: string;
  expiresAt: string;
}

const ShareModalContent: FC<ShareModalContentProps> = ({
  newbieLink,
  expiresAt,
}) => {
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
        <CopyButton content={newbieLink} />
        {isMobile() && (
          <Button
            label={<FontAwesomeIcon icon={faShare} />}
            classes="ml-2"
            onClick={() => {
              navigator.share({ url: newbieLink });
            }}
          />
        )}
      </div>
    </>
  );
};

export default ShareModalContent;

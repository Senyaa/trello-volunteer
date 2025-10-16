"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { isMobile } from "@/app/helpers/isMobile";

const ShareButton = ({ link }: { link: string }) => {
  if (isMobile()) {
    return (
      <Button
        label={<FontAwesomeIcon icon={faShare} />}
        classes="ml-2"
        onClick={() => {
          navigator.share({ url: link });
        }}
      />
    );
  } else {
    return null;
  }
};

export default ShareButton;

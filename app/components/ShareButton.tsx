"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "../helpers/isMobile";
import Button from "./ui/Button";
import { faShare } from "@fortawesome/free-solid-svg-icons";

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

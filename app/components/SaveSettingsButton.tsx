"use client";
import { FC } from "react";
import Button from "./ui/Button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SaveSettingsButtonProps {
  formStatus: string;
}

const SaveSettingsButton: FC<SaveSettingsButtonProps> = ({ formStatus }) => {
  const getLabel = () => {
    switch (formStatus) {
      case "SAVED":
        return "Zapisano";
      case "LOADING":
        return "Zapisuję...";
      default:
        return "Zapisz";
    }
  };

  return (
    <Button
      label={getLabel()}
      type="submit"
      classes="w-full text-center mt-2"
      disabled={formStatus !== "INITIAL"}
      iconRight={
        formStatus === "SAVED" ? (
          <FontAwesomeIcon icon={faCheck} className="ml-2" />
        ) : null
      }
    />
  );
};

export default SaveSettingsButton;

"use client"

import { isMobile } from "../helpers/isMobile";
import Button from "./ui/Button";

const CheatSheetButton = () => {
  if (!isMobile()) {
    return (
      <Button
        href="/protected/animals/dogs/cheatsheet"
        label="Ściąga do druku"
      />
    );
  } else {
    return null;
  }
};

export default CheatSheetButton;

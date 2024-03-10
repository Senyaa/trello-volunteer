"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { Card } from "../types/Card";
import Cheatsheet from "./CheatSheet";
import CheatsheetGrid from "./CheatSheetGrid";
import { useState } from "react";
import Button from "./ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTable } from "@fortawesome/free-solid-svg-icons";

const DogsPdfViewer = ({ dogs }: { dogs: Card[] }) => {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <>
      <div className="flex justify-end mb-2">
        {!isGrid ? (
          <Button
            onClick={() => setIsGrid(true)}
            label="Tabelka"
            iconLeft={<FontAwesomeIcon icon={faTable} className="mr-2" />}
          />
        ) : (
          <Button
            onClick={() => setIsGrid(false)}
            label="Lista"
            iconLeft={<FontAwesomeIcon icon={faList} className="mr-2" />}
          />
        )}
      </div>
      <PDFViewer className="h-full hidden md:block">
        {isGrid ? <CheatsheetGrid dogs={dogs} /> : <Cheatsheet dogs={dogs} />}
      </PDFViewer>
    </>
  );
};

export default DogsPdfViewer;

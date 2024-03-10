"use client"

import { PDFViewer } from "@react-pdf/renderer";
import Cheatsheet from "./CheatSheet";
import { Card } from "../types/Card";

const DogsPdfViewer = ({dogs} : {dogs: Card[]}) => {
    return (
        <PDFViewer className="h-full hidden md:block">
          <Cheatsheet dogs={dogs}/>
        </PDFViewer>
      );
}

export default DogsPdfViewer;
import { FC } from "react";
import getAnimalsOnShiftByShiftId from "@/actions/getAnimalsOnShiftByShiftId";
import { getAnimalByCardId } from "@/actions/getAnimalByCardID";
import getShiftById from "@/actions/getShiftById";
import CopyButton from "./CopyButton";

interface ReportProps {
  shiftId: string;
}

const Report: FC<ReportProps> = async ({ shiftId }) => {
  const shift = await getShiftById(shiftId);

  const generateReport = async (): Promise<string> => {
    const animals = await getAnimalsOnShiftByShiftId(shiftId);
    const animalsWithDescription = animals.filter((a) => a.description);
    const animalDetails = await Promise.all(
      animalsWithDescription.map((a) =>
        getAnimalByCardId(a.animalTrelloId || "")
      )
    );
    const animalNotes = animalsWithDescription
      .map((a) => {
        const animalName = animalDetails.find(
          (ad) => ad?.id === a.animalTrelloId
        )?.name;
        return `${animalName || "Kot przeniesiony"}: ${a.description}`;
      })
      .join("  \n");

    const shiftNote = shift?.description || "";

    return shiftNote.concat(" \n\n", animalNotes);
  };

  const report = await generateReport();
  const date = shift?.started ? shift.started : shift?.finished

  return (
    <div className="rounded-md bg-white dark:bg-neutral-800 p-2 w-full mb-2 max-w-[640px]">
      <h2 className="font-extrabold mb-2">
        Raport {date?.toLocaleDateString("pl")}
      </h2>
      <span className="whitespace-pre-wrap">
        {report.trim() !== "" ? report : "Brak notatek"}
      </span>
      <div className="flex justify-end">
        <CopyButton content={report} />
      </div>
    </div>
  );
};

export default Report;

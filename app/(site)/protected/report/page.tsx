import { getAnimalByCardId } from "@/actions/getAnimalByCardID";
import getAnimalsOnShiftByShiftId from "@/actions/getAnimalsOnShiftByShiftId";
import { getCurrentShiftId } from "@/actions/getCurrentShiftId";
import CopyButton from "@/app/components/CopyButton";

const ReportPage = async () => {
  const shiftId = await getCurrentShiftId();

  if (!shiftId) {
    return <div className="p-2">Obecnie nie trwa zaden dyzur</div>;
  }

  const animals = await getAnimalsOnShiftByShiftId(shiftId);

  const generateReport = async () => {
    const animalsWithDescription = animals.filter((a) => a.description);
    const animalDetails = await Promise.all(
      animalsWithDescription.map((a) =>
        getAnimalByCardId(a.animalTrelloId || "")
      )
    );
    return animalsWithDescription
      .map((a) => {
        const animalName = animalDetails.find(
          (ad) => ad.id === a.animalTrelloId
        )?.name;
        return `${animalName}: ${a.description}`;
      })
      .join("  \n");
  };

  const raport = await generateReport();
  return (
    <div className="p-2">
      <div className="rounded-md bg-white dark:bg-neutral-800 p-2 w-full mb-2 max-w-[640px]">
        <h2 className="font-extrabold mb-2">
          Raport {new Date().toLocaleDateString("pl")}
        </h2>
        <span className="whitespace-pre-wrap">{raport ? raport : "Brak notatek"}</span>
        <div className="flex justify-end">
          <CopyButton content={raport} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

import { getAnimalByCardId } from "@/actions/getAnimalByCardID";
import getShiftById from "@/actions/getShiftById";
import BackButton from "@/app/components/BackButton";
import CopyButton from "@/app/components/CopyButton";

const ShiftFinished = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const shiftId = searchParams.shiftId || "";
  const animals = await getShiftById(shiftId);

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
    <div className="flex flex-col items-center mt-4 p-2">
      {raport && (
        <div className="rounded-md bg-neutral-800 p-2 w-full mb-2 max-w-[640px]">
          <h2 className="font-extrabold mb-2">Raport {new Date().toLocaleDateString()}</h2>
          <span className="whitespace-pre-wrap">{raport}</span>
          <div className="flex justify-end">
            <CopyButton content={raport} />
          </div>
        </div>
      )}
      <article className="max-w-[640px]">
        <ul className="list-image-[url(/assets/checkmark.svg)] px-4">
          <li>podłogi umyte?</li>
          <li>okna zamknięte?</li>
          <li>światła zgaszone a lampy włączone?</li>
        </ul>
        <section className="my-4 text-center">
          <span>Jeszcze tylko pamiętaj aby się zdezynfekować i...</span>
          <h2 className="font-extrabold">Dzięki za to co robisz ❤️</h2>
        </section>
      </article>
      <BackButton />
    </div>
  );
};

export default ShiftFinished;

import Report from "@/app/components/Report";

const ShiftFinished = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const sp = await searchParams;
  const shiftId = sp.shiftId || "";

  return (
    <div className="flex flex-col items-center mt-4 p-2">
      <div className="w-full px-2 mb-4">
        <h2 className="font-extrabold text-lg w-full text-left">
          Koniec dyżuru
        </h2>
      </div>
      <Report shiftId={shiftId} />
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
    </div>
  );
};

export default ShiftFinished;

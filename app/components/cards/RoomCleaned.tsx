import EndShiftButton from "../shift/EndShiftButton";

const RoomCleaned = ({ room }: { room: string | null }) => {
  return (
    <div className="flex flex-col px-2 py-4 bg-neutral-100 dark:bg-neutral-900 m-2 rounded-md">
      <p className="text-center">
        <span className="font-extrabold mb-2 block">
          Wszystko {room && "tu "}zrobione!
        </span>
        {room && (
          <>
            <span>
              Sprawdź inne pomieszczenia używając selektora w prawym górnym rogu
            </span>
            <span className="my-2 block">lub</span>
          </>
        )}
      </p>
      <EndShiftButton classNames="mt-2" />
    </div>
  );
};

export default RoomCleaned;

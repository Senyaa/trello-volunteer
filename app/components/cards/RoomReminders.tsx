import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const RoomReminders = ({ room }: { room?: string | null }) => {
  const isLowerCatroom = room === "lowercatroom";
  const isUpperCatroom = room === "uppercatroom";

  const dayOfTheWeek = new Date().getDay();

  const isFriday = dayOfTheWeek === 5;
  const isMonday = dayOfTheWeek === 1;

  return (
    <div className="mb-4">
      {(isLowerCatroom || !room) && isFriday && (
        <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row  items-center rounded-md">
          <FontAwesomeIcon
            icon={faWarning}
            className="mr-4 text-green-700 text-xl"
          />
          <div>
            <p className="font-bold text-green-700">Dziś jest piątek </p>
            <p>Zmień legowiska w dolnej kociarni </p>
          </div>
        </div>
      )}
      {(isUpperCatroom || !room) && isMonday && (
        <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row  items-center rounded-md">
          <FontAwesomeIcon
            icon={faWarning}
            className="mr-4 text-green-700 text-xl"
          />
          <div>
            <p className="font-bold text-green-700">Dziś jest poniedziałek </p>
            <p>Zmień legowiska w górnej kociarni </p>
          </div>
        </div>
      )}
      {isLowerCatroom && (
        <div className="py-2 px-4 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-green-700 flex flex-row  items-center rounded-md">
          <span>Do karmy podaj vetomune/genomune</span>
        </div>
      )}
    </div>
  );
};

export default RoomReminders;

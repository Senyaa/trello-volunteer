import getYourGuestViews from "@/actions/getYourGuestViews";
import StartNewbieMode from "@/app/components/StartNewbieMode";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NewbiePage = async () => {
  const yourShared = await getYourGuestViews();

  const getFormattedHour = (date: Date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  return (
    <div className="h-full p-4 mb-8">
      <h2 className="font-extrabold my-2 text-lg">Świeżynka</h2>
      <p className="text-sm mb-2">
        Klikając udostępnij, przekazujesz aktualny na daną chwilę stan trello
        osobie niezalogowanej mającej dostęp do wygenerowanego linku na
        określony czas.
      </p>
      <StartNewbieMode />

      <div>
        <h3 className="font-extrabold mb-2 mt-4">Historia</h3>
        {yourShared.length > 0 ? (
          <ul>
            {yourShared.map((sh) => (
              <li
                key={sh.id}
                className="flex justify-between my-1 p-2 bg-white dark:bg-neutral-900 rounded-md"
              >
                {sh.createdAt && (
                  <div>
                    <span className="block">
                      {sh.createdAt.toLocaleDateString("pl")}{" "}
                    </span>
                    <span className=" block text-sm dark:text-neutral-400">
                      {`${getFormattedHour(sh.createdAt)}-${getFormattedHour(
                        sh.endsAt
                      )}`}{" "}
                    </span>
                  </div>
                )}
                <div className="flex">
                  {new Date(sh.endsAt) < new Date() ? (
                    <div className="ml-2 rounded-full text-center text-xs bg-red-100 dark:bg-red-900 px-1 h-fit">
                      zakończono
                    </div>
                  ) : (
                    <div className="ml-2 rounded-full text-center text-xs bg-green-100 dark:bg-green-900 px-2 h-fit">
                      trwa{" "}
                    </div>
                  )}
                  <Link
                    href={`/protected/newbie/${sh.id}`}
                    className="flex items-center"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="px-2" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span>Nie udostępniłeś jeszcze kart żadnym świeżynkom</span>
        )}
      </div>
    </div>
  );
};
export default NewbiePage;

import getMyShiftsFrom30Days from "@/actions/getMyShiftsFrom30Days";
import SignOutButton from "@/app/components/SignOutButton";
import User from "@/app/components/User";
import Container from "@/app/components/ui/Container";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Profile = async () => {
  const shifts = await getMyShiftsFrom30Days();

  return (
    <Container>
      <div className="flex justify-between">
        <h2 className="font-extrabold text-lg">
          <User />
        </h2>
        <SignOutButton />
      </div>
      <section>
        <span className="font-bold">
          Moje dyżury <small>(ostatnie 30 dni)</small>
        </span>
        {shifts.length > 0 ? (
          shifts.map((shift) => (
            <Link
              key={shift.id}
              href={`/protected/shift/${shift.id}`}
              className="flex justify-between items-center my-2 bg-white dark:bg-neutral-900 rounded-md p-2"
            >
              <span>
                {shift.shiftType === "cats" ? "🐱" : "🐶"}
                {shift.started
                  ? shift.started.toLocaleDateString("pl")
                  : shift.finished?.toLocaleDateString("pl")}
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          ))
        ) : (
          <div className="mt-4">
            <span>Brak dyżurów w aplikacji</span>
          </div>
        )}
      </section>
    </Container>
  );
};

export default Profile;

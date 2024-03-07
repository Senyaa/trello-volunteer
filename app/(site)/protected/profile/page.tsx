import getMyShiftsFrom30Days from "@/actions/getMyShiftsFrom30Days";
import SignOutButton from "@/app/components/SignOutButton";
import User from "@/app/components/User";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Profile = async () => {

  const shifts = await getMyShiftsFrom30Days();

  return (
    <div className="flex flex-col pt-4 h-full justify-between mb-16 px-4">
      <div>
      
        <div className="font-extrabold text-lg">
          <User />
        </div>
        <section>
          <span className="font-extrabold">
            Moje dyżury <small>(ostatnie 30 dni)</small>
          </span>
          {shifts.length > 0 ? shifts.map((shift) => (
            <Link key={shift.id} href={`/protected/shift/${shift.id}`} className="flex justify-between my-2">
              <span>
                {shift.shiftType === "cats" ? "🐱" : "🐶"}
                {shift.started
                  ? shift.started.toLocaleDateString("pl")
                  : shift.finished?.toLocaleDateString("pl")}
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          )) : <span>Brak dyzurów w aplikacji</span>}
        </section>
      </div>
      <SignOutButton />
    </div>
  );
};

export default Profile;

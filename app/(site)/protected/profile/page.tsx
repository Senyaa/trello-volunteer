import getMyShiftsFrom30Days from "@/actions/getMyShiftsFrom30Days";
import SignOutButton from "@/app/components/SignOutButton";
import User from "@/app/components/User";
import { parseToHumanDateTime } from "@/app/helpers/parseToHumanDatetime";

const Profile = async () => {
  const getShifts = async () => {
    const myShifts = await getMyShiftsFrom30Days();
    return myShifts;
  };

  const shifts = await getShifts();

  return (
    <div className="flex flex-col pt-4 h-full justify-between mb-16 px-2">
      <div>
        <div className="font-extrabold text-center">
          <User />
        </div>
        <section>
          <span className="font-extrabold">
            Moje dyżury <small>(ostatnie 30 dni)</small>
          </span>
          {shifts.map((shift) => (
            <div key={shift.id}>
              <span>
                {shift.shiftType === "cats" ? "🐱" : "🐶"}
                {shift.started
                  ? shift.started.toLocaleDateString("pl")
                  : shift.finished?.toLocaleDateString("pl")}
              </span>
            </div>
          ))}
        </section>
      </div>
      <SignOutButton />
    </div>
  );
};

export default Profile;

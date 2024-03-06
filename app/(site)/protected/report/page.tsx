import { getCurrentShiftId } from "@/actions/getCurrentShiftId";
import Report from "@/app/components/Report";

const ReportPage = async () => {
  const shiftId = await getCurrentShiftId();

  if (!shiftId) {
    return <div className="p-2">Obecnie nie trwa zaden dyzur</div>;
  }

  return (
    <div className="p-2">
      <Report shiftId={shiftId} />
    </div>
  );
};

export default ReportPage;

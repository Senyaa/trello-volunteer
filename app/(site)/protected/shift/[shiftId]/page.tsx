import getShiftById from "@/actions/getShiftById";
import Report from "@/app/components/Report";

const ShiftPage = async ({ params }: { params: { shiftId: string } }) => {
  const shiftId = params.shiftId;

  const shift = await getShiftById(shiftId);

  const date = shift?.started ? shift.started : shift?.finished
  return (
    <div className="p-4">
      <h2 className="font-extrabold text-lg">Dyżur z dnia {date?.toLocaleDateString("pl")}</h2>
      <Report shiftId={shiftId} />
    </div>
  );
};

export default ShiftPage;

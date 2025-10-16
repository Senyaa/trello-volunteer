import getShiftById from "@/actions/getShiftById";
import Report from "@/app/components/Report";
import Container from "@/app/components/ui/Container";

const ShiftPage = async ({ params }: { params: Promise<{ shiftId: string }> }) => {
  const paramsResolved = await params;
  const shiftId = paramsResolved.shiftId;

  const shift = await getShiftById(shiftId);

  const date = shift?.started ? shift.started : shift?.finished
  return (
    <Container>
      <h2 className="font-extrabold text-lg">Dyżur z dnia {date?.toLocaleDateString("pl")}</h2>
      <Report shiftId={shiftId} />
    </Container>
  );
};

export default ShiftPage;

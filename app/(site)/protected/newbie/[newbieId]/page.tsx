import { getGuestView } from "@/actions/getGuestView";
import CopyButton from "@/app/components/newbie/CopyButton";
import { parseToHumanDateTime } from "@/app/helpers/parseToHumanDatetime";
import QRCode from "react-qr-code";
import { headers } from "next/headers";
import Link from "next/link";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "@/app/components/ui/Container";
import ShareButton from "@/app/components/newbie/ShareButton";

const NewbieShiftPage = async ({
  params,
}: {
  params: Promise<{ newbieId: string }>;
}) => {
  const paramsResolved = await params;
  const headersList = await headers();
  const domain = headersList.get("host") || "";
  const newbieId = paramsResolved.newbieId;
  const guestView = await getGuestView(newbieId);
  const newbieLink = `${domain}/newbie/${newbieId}`;

  if (!guestView) return <Container>This guest view doesn&apos;t exist</Container>;
  return (
    <Container>
      <Link
        href="/protected/newbie"
        className="mb-4 block text-sm underline text-green-700"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="mr-1" />
        Wróć do świeżynek
      </Link>
      {guestView.endsAt > new Date() ? (
        <span className="block text-sm mb-4">
          {guestView.type === "dogs" ? "🐶" : "🐱"}
          Ten link będzie działał przez 3 godziny, do{" "}
          {parseToHumanDateTime(guestView.endsAt)}.
        </span>
      ) : (
        <span>Ten link już nie działa</span>
      )}
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 mb-4 md:max-w-[280px]">
          <QRCode
            size={256}
            style={{ height: "256px", maxWidth: "100%", width: "100%" }}
            value={newbieLink}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className="flex items-center mb-4">
          <span className="p-2 bg-white dark:bg-neutral-600 rounded-md overflow-x-hidden text-nowrap select-all whitespace-nowrap">
            {newbieLink}
          </span>
          <CopyButton content={newbieLink} />
          <ShareButton link={newbieLink} />
        </div>
      </div>
    </Container>
  );
};
export default NewbieShiftPage;

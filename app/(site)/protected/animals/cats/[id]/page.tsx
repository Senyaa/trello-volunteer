import { getAnimalByCardId } from "@/actions/getAnimalByCardID";
import CardDetail from "@/app/components/CardDetail";
import Container from "@/app/components/ui/Container";
import { allTrueSettings } from "@/app/helpers/consts";
import getDetails from "@/app/helpers/details";
import { replaceMDLink } from "@/app/helpers/replaceMDLink";
import { getServerSession } from "@/lib/getSession";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDetailsHeaders } from "@/app/helpers/details";
import Image from "next/image";

const CatPage = async ({
  params,
  pathname,
}: {
  params: { id: string };
  pathname: string[];
}) => {
  const session = await getServerSession();
  const cat = await getAnimalByCardId(params.id);

  if (!cat)
    return (
      <Container>
        <span>Nie mogliśmy znaleźć takiego zwierzaka.</span>
      </Container>
    );

  const detailsValues = getDetails(cat.desc);

  const [name, info] = cat.name.split(" - ");

  return (
    <Container>
      <div>
        <Image
          src={"/assets/placeholder.png"}
          alt={cat.name}
          width={112}
          height={112}
          className="object-cover rounded-full aspect-square"
          priority={false}
        />
      </div>
      <div className="md:shrink-0 md:w-[12rem] md:px-2">
        {info && (
          <div className="bg-blue-100 dark:bg-blue-300 border border-blue-200 dark:border-blue-800 w-full rounded-md p-1 px-2 mt-2 md:mt-0 md:mb-1">
            <div className="text-blue-800 whitespace-pre-wrap leading-none">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              {info}
            </div>
          </div>
        )}
        {detailsValues.warning && (
          <div className="bg-red-100 dark:bg-red-300 border border-red-200 dark:border-red-800 w-full rounded-md p-1 px-2 mt-2 md:mt-0">
            <span className="text-red-800 text-xs font-bold">UWAGA!</span>
            <div className="text-red-800 whitespace-pre-wrap leading-none">
              <span
                dangerouslySetInnerHTML={{
                  __html: replaceMDLink(detailsValues.warning),
                }}
              ></span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row w-full md:gap-2">
        <CardDetail text={detailsValues.food} icon="🍽" />
        {getDetailsHeaders(allTrueSettings, detailsValues).map((detail) => {
          const displayForType = detail.onlyType
            ? pathname.includes(detail?.onlyType)
            : true;
          if (displayForType) {
            return (
              <CardDetail
                key={detail.plName}
                visible={Boolean(detail.isEnabled && detail.value)}
                text={detail.value}
                icon={detail.icon}
                isOn={detail.isEnabled}
              />
            );
          }
        })}
      </div>
    </Container>
  );
};

export default CatPage;

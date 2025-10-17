import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { getDetailsHeaders } from "@/app/helpers/details";
import { usePathname } from "next/navigation";

interface AnimalListDesktopHeaderProps {
  settings: SettingsFormType;
  isShift?: boolean;
}

const AnimalListDesktopHeader = ({
  settings,
  isShift,
}: AnimalListDesktopHeaderProps) => {
  const pathname = usePathname();

  const headerDetails = () => {
    if (Object.values(settings).length < 2) return null;
    return (
      <>
        {getDetailsHeaders(settings).map((header) => {
          const displayForType = header.onlyType
            ? pathname.includes(header?.onlyType)
            : true;
          if (header.isEnabled && displayForType)
            return (
              <div key={header.plName} className="detail-cell">{`${
                header.icon ? header.icon + " " : ""
              }${header.plName}`}</div>
            );
        })}
      </>
    );
  };

  return (
    <div className="hidden md:flex sticky top-0 right-0 left-0 z-10 bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 mt-2 gap-2 border-2 border-solid dark:border-black">
        <div className="shrink-0 w-[12rem]">Imię</div>
        <div className="shrink-0 w-[12rem]">Uwagi</div>
        <div className="flex w-full gap-2">
          <div className="detail-cell">🍽 Karma</div>
          {headerDetails()}
        </div>
        {!pathname.includes("newbie") && (
          <>
            <div className="w-[3rem]">Trello</div>
            {isShift ? <div className="w-[3rem]">Dyżur</div> : null}
          </>
        )}
    </div>
  );
};

export default AnimalListDesktopHeader;

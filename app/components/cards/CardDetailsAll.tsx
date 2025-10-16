"use client";

import { usePathname } from "next/navigation";
import CardDetail from "@/app/components/cards/CardDetail";
import { getDetailsHeaders } from "@/app/helpers/details";
import { allTrueSettings } from "@/app/helpers/consts";

export default function CatDetails({ cat }: { cat: any }) {
  const pathname = usePathname();
  const detailsValues = cat.desc ? JSON.parse(cat.desc) : {};

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-2">
      <CardDetail text={detailsValues.food} icon="🍽" />

      {getDetailsHeaders(allTrueSettings, detailsValues).map((detail) => {
        const displayForType = detail.onlyType
          ? pathname.includes(detail.onlyType)
          : true;

        if (!displayForType) return null;

        return (
          <CardDetail
            key={detail.plName}
            visible={Boolean(detail.isEnabled && detail.value)}
            text={detail.value}
            icon={detail.icon}
            isOn={detail.isEnabled}
          />
        );
      })}
    </div>
  );
}

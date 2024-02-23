import { FC } from "react";

interface DetailProps {
  visible?: boolean;
  text?: string;
  icon?: string;
  isOn?: boolean;
}

const CardDetail: FC<DetailProps> = ({
  visible = true,
  text,
  icon,
  isOn = true,
}) => {

  return (
    <div className={isOn ? 'detail-cell' : "hidden"}>
      {visible && (
        <div className="text-wrap overflow-auto break-word mt-2 md:mt-0 flex gap-2 md:gap-0 w-full rounded-md bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-black border p-2">
          {icon && <div className="md:hidden">{icon}</div>}
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default CardDetail;

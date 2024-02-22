import { FC } from "react";

interface DetailProps {
  visible?: boolean;
  text: string;
  icon: string;
  isOn?: boolean;
  width: string;
}

const CardDetail: FC<DetailProps> = ({
  visible = true,
  text,
  icon,
  isOn = true,
  width,
}) => {
  return (
    <div className={isOn ? width : "hidden"}>
      {visible && (
        <div className="text-wrap overflow-auto mt-2 md:mt-0 flex gap-2 md:gap-0 w-full rounded-md bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-black border p-2">
          <div className="md:hidden">{icon}</div>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default CardDetail;

import { FC, useEffect } from "react";
interface ToastProps {
  text: string;
  isShown: boolean;
  hide: () => void;
}
const Toast: FC<ToastProps> = ({ text, hide, isShown }) => {
  useEffect(() => {
    if (isShown) {
      setTimeout(hide, 3000);
    }
  }, [isShown, hide]);

  return (
    <div className="w-full flex justify-center">
      <div
        className={`rounded-full px-4 py-2 bg-neutral-200 dark:bg-neutral-700 fixed z-40 transition-all ease-in-out  ${
          isShown ? "bottom-10 -translate-y-250" : "-bottom-10 opacity-0"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Toast;

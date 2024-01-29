import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="w-full h-full bg-black opacity-50 flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" size="lg" />
    </div>
  );
};

export default Loading;

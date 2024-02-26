import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactNode } from "react";

interface ModalProps {
  title: string;
  content: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-30">
      <div className="absolute w-full h-full bg-black opacity-50"></div>
      <div className="bg-white dark:bg-neutral-700 rounded-md shadow-md w-[70%] max-w-md absolute py-2 px-4 opacity-100">
        <div className="flex justify-between mt-2 mb-4">
          <h3 className="text-lg font-extrabold">{title}</h3>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default Modal;

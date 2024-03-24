import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { addShiftNote } from "@/actions/addShiftNote";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface ShiftNoteModalProps {
  note: string;
  onClose: (value: string) => void;
}

const ShiftNoteModal: FC<ShiftNoteModalProps> = ({ note, onClose }) => {
  const date = new Date().toLocaleDateString();

  const router = useRouter();

  const [noteValue, setNoteValue] = useState(note);

  const saveNote = async () => {
    await addShiftNote("cats", noteValue);
    onClose(noteValue);
    router.refresh();
  };

  const modalContent = (
    <>
      <textarea
        className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 shadow-inner"
        placeholder="Wpisz uwagi do dyżuru..."
        value={noteValue}
        onChange={(e) => setNoteValue(e.target.value)}
        name={"shift"}
        id={"shift"}
        cols={30}
        rows={3}
      />
      <div className="w-full flex justify-end">
        <Button onClick={saveNote} label="Zapisz" />
      </div>
    </>
  );

  return createPortal(
    <Modal
      title={`Dyżur ${date}`}
      content={modalContent}
      onClose={() => {
        setNoteValue(note);
        onClose(note);
      }}
    />,
    document.body
  );
};

export default ShiftNoteModal;

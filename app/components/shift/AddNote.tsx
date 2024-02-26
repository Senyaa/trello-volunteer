import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { FC, useState } from "react";
import Modal from "../ui/Modal";
import { createPortal } from "react-dom";
import { addNote } from "@/actions/addNote";
import { getAnimalByCardId } from "@/actions/getAnimalByCardID";

interface AddNoteProps {
  animalID: string;
  note: string;
}

const AddNote: FC<AddNoteProps> = ({ animalID, note }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [noteValue, setNoteValue] = useState(note);
  const [catName, setCatName] = useState("");
  const date = new Date().toLocaleDateString();

  const getName = async () => {
    const card = await getAnimalByCardId(animalID);
    return card.name;
  };

  const saveNote = async () => {
    await addNote("cats", animalID, noteValue);
    setIsModalOpened(false);
  };

  const content = (
    <>
      <textarea
        className="w-full dark:bg-neutral-800 rounded-md p-2"
        placeholder="Wpisz uwagi..."
        value={noteValue}
        onChange={(e) => setNoteValue(e.target.value)}
        name={animalID}
        id={animalID}
        cols={30}
        rows={3}
      />
      <div className="w-full flex justify-end">
        <Button onClick={saveNote} label="Zapisz" />
      </div>
    </>
  );

  return (
    <>
      {isModalOpened &&
        createPortal(
          <Modal
            title={`Notatka dyzurowa: ${catName} ${date}`}
            content={content}
            onClose={() => {
              setNoteValue(note);
              setIsModalOpened(false);
            }}
          />,
          document.body
        )}
      <Button
        label={note === "" && !noteValue ? "Dodaj notatkę" : "Edytuj notatkę"}
        onClick={async () => {
          setCatName(await getName());
          setIsModalOpened(true);
        }}
        iconRight={<FontAwesomeIcon icon={faStickyNote} className="ml-2" />}
        classes="mr-2 h-7 pt-1 text-sm"
      />
    </>
  );
};

export default AddNote;

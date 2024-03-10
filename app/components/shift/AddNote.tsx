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
    return card?.name.split("-")[0];
  };

  const saveNote = async () => {
    await addNote("cats", animalID, noteValue);
    setIsModalOpened(false);
  };

  const content = (
    <>
      <textarea
        className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 shadow-inner"
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
            title={`${catName} ${date}`}
            content={content}
            onClose={() => {
              setNoteValue(note);
              setIsModalOpened(false);
            }}
          />,
          document.body
        )}
      <div className="relative">
        {note && noteValue && (
          <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-700 z-10 right-0 mr-4 md:mr-2 mt-1"></span>
        )}
        <Button
          label={""}
          onClick={async () => {
            setCatName(await getName() || "");
            setIsModalOpened(true);
          }}
          iconRight={<FontAwesomeIcon icon={faStickyNote} />}
          classes="mr-2 md:mr-0 h-7 pt-1 px-[11px] md:pr-0 text-sm text-neutral-300 dark:text-white"
          level="terinary"
          color="grey"
        />
      </div>
    </>
  );
};

export default AddNote;

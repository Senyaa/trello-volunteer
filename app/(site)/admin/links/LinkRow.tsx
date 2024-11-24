"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { FC, useState } from "react";
import Link from "./types";

interface LinkRowProps {
  initialLink: Link;
  remove: (id?: string) => void;
  save: (label: string, url: string, id?: string) => void;
}

const LinkRow: FC<LinkRowProps> = ({ initialLink, remove, save }) => {
  const initialState = initialLink?.edit || false;
  const [edit, setEdit] = useState(initialState);
  const [link, setLink] = useState(initialLink);

  console.log(edit, initialLink)

  const handleSave = () => {
    save(link.label, link.url, link.id);
    setEdit(false);
  };

  if (edit) {
    return (
      <div className="w-full flex mb-2 justify-between grow">
        <Input
          id="link-label"
          placeholder="Nazwa"
          value={link?.label}
          onInput={(e) => {
            setLink({ ...link, label: e.target.value });
          }}
          classes="mr-1 grow-1 w-full"
        />
        <Input
          id="link-url"
          placeholder="Link"
          value={link?.url}
          onInput={(e) => setLink((prev) => ({ ...prev, url: e.target.value }))}
          classes="mr-1 grow-1 w-full"
        />
        <Button label="Zapisz" onClick={handleSave} classes="grow-0" />
      </div>
    );
  }

  const spanClass =
    "w-[40%] mr-1 rounded-md py-1 px-2 dark:text-white bg-neutral-200 dark:bg-neutral-800 active:outline-none";
  return (
    <div className="w-full flex mb-2 items-center justify-between">
      <span className={spanClass} onClick={() => setEdit(true)}>
        {link?.label}
      </span>
      <span className={spanClass} onClick={() => setEdit(true)}>
        {link?.url.slice(0, 22)}...
      </span>
      <div className="grow-1 w-[20%] flex justify-end">
        <Button
          label="Edytuj"
          onClick={() => setEdit(true)}
          classes="mr-1 w-[48%]"
        />
        <Button
          classes="w-[48%]"
          label="Usuń"
          onClick={() => remove(link.id)}
          color="grey"
          outlined
        />
      </div>
    </div>
  );
};

export default LinkRow;

"use client";

import { FC, useState } from "react";
import LinkRow from "./LinkRow";

import Button from "@/app/components/ui/Button";
import Link from "./types";
import { addLink } from "@/actions/addLink";

const LinkList: FC<{
  linkList: Link[];
  onRemove: (id?: string) => void;
}> = ({ linkList, onRemove }) => {
  let theLinks: { [key: string]: Link } = {};

  linkList.forEach((aLink) => {
    if (aLink.id) theLinks[aLink.id] = aLink;
  });

  const [links, setLinks] = useState<{ [key: string]: Link }>(theLinks);

  const handleAddLink = () => {
    const newLink = {
      id: "new-" + linkList.length,
      label: "",
      url: "",
      edit: true,
    };
    setLinks({ ...links, [newLink.id]: newLink });
  };

  const handleRemove = (id?: string) => {
    if (id) {
      const updatedLinks = Object.fromEntries(
        Object.entries(links).filter(([key]) => key !== id)
      );
      setLinks(updatedLinks);
      onRemove(id);
    }
  };

  const handleSave = async (label: string, url: string, id?: string) => {
    await addLink(label, url, id);
  };

  return (
    <>
      {Object.entries(links).length === 0 && <span>Brak linków</span>}
      {Object.values(links).map((link) => (
        <LinkRow
          key={link.id}
          initialLink={link}
          remove={handleRemove}
          save={handleSave}
        />
      ))}
      <Button label="Dodaj link" onClick={handleAddLink} />
    </>
  );
};

export default LinkList;

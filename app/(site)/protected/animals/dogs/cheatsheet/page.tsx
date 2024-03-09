import React from "react";
import DogsPdfViewer from "@/app/components/PdfViewer";
import { getParsedCards } from "@/actions/getParsedCards";
import { getServerSession } from "@/lib/getSession";
import { filterDogs } from "@/app/helpers/cardFilters";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const DogsCheatsheet = async () => {
  const session = await getServerSession();

  const cards = await getParsedCards(session?.user?.trelloId || "");
  const dogs = filterDogs(cards).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container classNames="h-full">
      <Button
        iconLeft={<FontAwesomeIcon icon={faArrowLeftLong} className="mr-2" />}
        label="Wróć do piesków"
        href="/protected/animals/dogs"
        level="terinary"
      />
      <DogsPdfViewer dogs={dogs} />
    </Container>
  );
};

export default DogsCheatsheet;
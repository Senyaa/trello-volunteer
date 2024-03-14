import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { getParsedCards } from "@/actions/getParsedCards";
import { getServerSession } from "@/lib/getSession";
import { filterDogs } from "@/app/helpers/cardFilters";
import DogsPdfViewer from "@/app/components/pdf/PdfViewer";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";


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
      <div className="md:hidden">
        <span>
          Ten widok jest niedostępny na telefonie. Spróbuj otworzyć tę stronę na
          komputerze.
        </span>
      </div>
      <DogsPdfViewer dogs={dogs}/>
    </Container>
  );
};

export default DogsCheatsheet;

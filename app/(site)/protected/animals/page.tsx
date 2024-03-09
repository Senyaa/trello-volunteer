import AnimalButton from "@/app/components/AnimalButton";
import Container from "@/app/components/ui/Container";
import { faDog, faCat } from "@fortawesome/free-solid-svg-icons";

const Animals = () => {
  return (
    <Container classNames="items-center">
      <div className="flex flex-col md:flex-row w-full justify-center">
        <AnimalButton
          link="/protected/animals/dogs"
          label="pieski"
          icon={faDog}
          classes="mb-2 mr-2"
        />
        <AnimalButton
          link="/protected/animals/cats"
          label="kotki"
          icon={faCat}
        />
      </div>
    </Container>
  );
};

export default Animals;

import Container from "@/app/components/ui/Container";
import { faDog, faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Animals = () => {
  return (
    <Container classNames="items-center">
        <Link
          href="/protected/animals/dogs"
          className="bg-green-700 text-white px-4 py-8 rounded-md w-full  max-w-[400px] mb-2"
        >
          <div className="flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faDog} className="mb-4" />
            <span>Pieski</span>
          </div>
        </Link>
        <Link
          href="/protected/animals/cats"
          className="bg-green-700 text-white px-4 py-8 rounded-md w-full max-w-[400px]"
        >
          <div className="flex flex-col items-center justify-center">
            <FontAwesomeIcon icon={faCat} className="mb-4" />
            <span>Kotki</span>
          </div>
        </Link>
    </Container>
  );
};

export default Animals;

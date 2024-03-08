import getNewAnimals from "@/actions/getNewAnimals";
import { getServerSession } from "@/lib/getSession";
import MiniAnimalCard from "@/app/components/MiniAnimalCard";
import Button from "@/app/components/ui/Button";

const Home = async () => {
  const session = await getServerSession();

  const newAnimals = await getNewAnimals(session?.user?.trelloId || "", 30);

  return (
    <main className="flex flex-col w-full mt-8 ">
      <span className="mb-4 text-lg px-4">Cześć {session?.user?.name}!</span>

      <span className="px-4 mb-4 text-neutral-700 dark:text-neutral-300">
        Design strony głównej jest w trakcie. Co chciał(a)byś tu zobaczyć?
      </span>

      {newAnimals.length > 0 ? (
        <>
          <div className="mb-2 px-4">
            <h2 className="font-extrabold">
              Nowi podopieczni ({newAnimals.length})
            </h2>
            <div className="text-sm text-neutral-500 leading-tight">
              Karty kotów i psów załozone w ciągu ostatnich 30 dni. Zobacz w
              trello klikając strzałkę.
            </div>
          </div>

          <div className="overflow-x-scroll flex pb-2">
            {newAnimals.map((animal) => (
              <MiniAnimalCard animal={animal} key={animal.id} />
            ))}
          </div>
        </>
      ) : null}

      <section className="p-4">
        <h2 className="font-extrabold">Linki</h2>
        <ul>
          <li>
            <Button
              href={process.env.NEXT_PUBLIC_CATS_AND_DOGS_SHEET_1 || "#"}
              label="Grafik psy i koty (26.02 - 10.03)"
              classes="w-full mb-2 block"
            />
          </li>
          <li>
            <Button
              href={process.env.NEXT_PUBLIC_CATS_AND_DOGS_SHEET_2 || "#"}
              label="Grafik psy i koty (11.03 - 24.03)"
              classes="w-full mb-2 block"
            />
          </li>
          <li>
            <Button
              href={process.env.NEXT_PUBLIC_WILDS_SHEET || "#"}
              label="Grafik dzikie"
              classes="w-full mb-2 block"
            />
          </li>
          <li>
            <Button
              href={process.env.NEXT_PUBLIC_FB_GROUP || "#"}
              label="Grupa FB"
              classes="w-full mb-2 block"
            />
          </li>
          <li>
            <Button
              href={process.env.NEXT_PUBLIC_ACTIVITY_SHEET || "#"}
              label="Plik aktywności"
              classes="w-full mb-2 block"
            />
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;

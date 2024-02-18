const getDetailSanitized = (description: string, regex: RegExp) => {
  return regex.exec(description)?.[1]?.toString().trim();
};

const getDetails = (description: string) => {
  const food =
    getDetailSanitized(description, new RegExp(/Karma\/Food:(.*?)😈/gis)) ||
    "zwykła";

  const testsFound = getDetailSanitized(
    description,
    new RegExp(/Testy:(.*?)(💉|🐛)/gis)
  );
  const tests =
    testsFound && testsFound.trim().toLocaleLowerCase() !== "ujemne"
      ? testsFound
      : "";

  const warning = getDetailSanitized(
    description,
    new RegExp(/UWAGA:(.*?)(Czip|Info dla)/gis)
  );

  const medsFound = getDetailSanitized(
    description,
    new RegExp(/Leki:(.*?)(nieaktualne|🍽)/gis)
  );

  const meds = medsFound && medsFound !== "brak" ? medsFound : "";

  const status =
    getDetailSanitized(description, new RegExp(/Status:(.*?)👮‍♀️/gis)) || "";
  const personality =
    getDetailSanitized(
      description,
      new RegExp(/Charakter\/Personality:(.*?)🐶/gis)
    ) || "";
  const castration =
    getDetailSanitized(description, new RegExp(/Kastracja:(.*?)🩸/gis)) || "";

  const dogInteraction =
    getDetailSanitized(
      description,
      new RegExp(/Stosunek do psów:(.*?)🐱/gis)
    ) || "";
  const catInteraction =
    getDetailSanitized(
      description,
      new RegExp(/Stosunek do kotów:(.*?)👶🏻/gis)
    ) || "";
  const childrenInteraction =
    getDetailSanitized(
      description,
      new RegExp(/Stosunek do dzieci:(.*?)👩🏼‍🏫/gis)
    ) || "";
  const deworming =
    getDetailSanitized(
      description,
      new RegExp(/Odrobaczanie \(data \+ środek\):(.*?)(👨🏻‍⚕️|💉)/gis)
    ) || "";
  const health =
    getDetailSanitized(
      description,
      new RegExp(/Leczenie\/Health:(.*?)👨🏻/gis)
    ) || "";
  const story =
    getDetailSanitized(description, new RegExp(/Historia:(.*?)✂️/gis)) || "";
  const infoForCarer =
    getDetailSanitized(description, new RegExp(/Info dla właścicieli\/opiekunów:(.*?)🏠/gis)) || "";
  return {
    food,
    tests,
    warning,
    meds,
    status,
    personality,
    castration,
    dogInteraction,
    catInteraction,
    childrenInteraction,
    deworming,
    health,
    story,
    infoForCarer
  };
};

export default getDetails;

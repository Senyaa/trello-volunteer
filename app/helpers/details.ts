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
    new RegExp(/UWAGA:(.*?)(Czip|Info)/gis)
  );

  const medsFound = getDetailSanitized(
    description,
    new RegExp(/Leki:(.*?)(nieaktualne|🍽)/gis)
  );

  const meds = medsFound && medsFound !== "brak" ? medsFound : "";

  const status = getDetailSanitized(
    description,
    new RegExp(/Status:(.*?)👮‍♀️/gis)
  ) || "";
  const personality = getDetailSanitized(
    description,
    new RegExp(/Charakter\/Personality:(.*?)🐶/gis)
  ) || "";
  const castration = getDetailSanitized(
    description,
    new RegExp(/Kastracja:(.*?)🩸/gis)
  ) || "";
  return { food, tests, warning, meds, status, personality, castration };
};

export default getDetails;
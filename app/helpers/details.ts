import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";

const getDetailSanitized = (
  description: string,
  regex: RegExp,
  isConsistentLabel = true
) => {
  const group = isConsistentLabel ? 1 : 2;
  return regex.exec(description)?.[group]?.toString().trim();
};

const getDetails = (description: string) => {
  const food =
    getDetailSanitized(
      description,
      new RegExp(/(Karma\/Food:|Karma:)(.*?)(😈|💊)/gis),
      false
    ) || "zwykła";

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
    new RegExp(/(❗️UWAGA:|UWAGA:|UWAGI:|❗️)(.*?)(Czip|Info dla|--)/gis),
    false
  );

  const medsFound = getDetailSanitized(
    description,
    new RegExp(/Leki:(.*?)(\.\.\.|___|---|nieaktualne|🍽|👱|😌)/gis)
  );

  const meds = medsFound && medsFound !== "brak" ? medsFound : "";

  const status =
    getDetailSanitized(
      description,
      new RegExp(/Status:(.*?)(---|🛏|👮‍♀️|📟)/gis)
    ) || "";
  const personality =
    getDetailSanitized(
      description,
      new RegExp(/(Charakter\/Personality:|Charakter:)(.*?)(🐶|🪪)/gis),
      false
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
      new RegExp(/Stosunek do dzieci:(.*?)(👩🏼‍🏫|📟)/gis)
    ) || "";
  const deworming =
    getDetailSanitized(
      description,
      new RegExp(/Odrobaczanie \(data \+ środek\):(.*?)(👨🏻‍⚕️|💉)/gis)
    ) || "";
  const health =
    getDetailSanitized(
      description,
      new RegExp(/Leczenie\/Health:(.*?)(👨🏻|)/gis)
    ) || "";
  const story =
    getDetailSanitized(
      description,
      new RegExp(/👩🏼‍🏫 Historia:(.*?)(✂️|👉)/gis)
    ) || "";
  const infoForCarer =
    getDetailSanitized(
      description,
      new RegExp(/Info dla właścicieli\/opiekunów:(.*?)Szacowany/gis)
    ) || "";
  const age =
    getDetailSanitized(
      description,
      new RegExp(/(Płeć, wiek:|Płeć\/wiek:|Szacowany wiek:)(.*?)(🏠|🐶)/gis),
      false
    ) || "";
  const bed =
    getDetailSanitized(description, new RegExp(/Legowisko:(.*?)🦮/gis)) || "";
  const walk =
    getDetailSanitized(description, new RegExp(/Spacery:(.*?)(🍲|🥘|🍽)/gis)) ||
    "";
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
    infoForCarer,
    age,
    bed,
    walk,
  };
};

//TODO: find
const detailsGot = getDetails("test");

export const getDetailsHeaders = (
  settings: SettingsFormType,
  details?: typeof detailsGot
) => {
  return [
    {
      isEnabled: settings.medsEnabled,
      icon: "💊",
      plName: "Leki",
      value: details?.meds,
      name: "meds",
    },
    {
      isEnabled: settings.bedEnabled,
      icon: "🛏",
      plName: "Legowisko",
      value: details?.bed,
      name: "bed",
      onlyType: "dogs",
    },
    {
      isEnabled: settings.walkEnabled,
      icon: "🦮",
      plName: "Spacer",
      value: details?.walk,
      name: "walk",
      onlyType: "dogs",
    },
    {
      isEnabled: settings.testsEnabled,
      icon: "🩸",
      plName: "Testy",
      value: details?.tests,
      name: "tests",
      onlyType: "cats",
    },
    {
      isEnabled: settings.statusEnabled,
      icon: "🏠",
      plName: "Status",
      value: details?.status,
      name: "status",
    },
    {
      isEnabled: settings.personalityEnabled,
      icon: "😈",
      plName: "Charakter",
      value: details?.personality,
      name: "personality",
    },
    {
      isEnabled: settings.castrationEnabled,
      icon: "✂️",
      plName: "Kastracja",
      value: details?.castration,
      name: "castration",
    },
    {
      isEnabled: settings.dogInteractionEnabled,
      icon: "🐶",
      plName: "Stosunek do psów",
      value: details?.dogInteraction,
      name: "dogInteraction",
    },
    {
      isEnabled: settings.catInteractionEnabled,
      icon: "🐱",
      plName: "Stosunek do kotów",
      value: details?.catInteraction,
      name: "catInteraction",
    },
    {
      isEnabled: settings.childrenInteractionEnabled,
      icon: "👶🏻",
      plName: "Stosunek do dzieci",
      value: details?.childrenInteraction,
      name: "childrenInteraction",
    },
    {
      isEnabled: settings.dewormingEnabled,
      icon: "🐛",
      plName: "Odrobaczanie",
      value: details?.deworming,
      name: "deworming",
    },
    {
      isEnabled: settings.healthEnabled,
      icon: "👨🏻",
      plName: "Leczenie",
      value: details?.health,
      name: "health",
    },
    {
      isEnabled: settings.storyEnabled,
      icon: "👩🏼‍🏫",
      plName: "Historia",
      value: details?.story,
      name: "story",
    },
    {
      isEnabled: settings.infoForCarerEnabled,
      plName: "Info dla opiekunów",
      value: details?.infoForCarer,
      name: "infoForCarer",
      onlyType: "cats",
    },
  ];
};

export default getDetails;

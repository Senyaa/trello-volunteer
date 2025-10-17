import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";
import { Details } from "../types/Details";

export const getDetailSanitized = (
  description: string,
  regex: RegExp,
  isConsistentLabel = true,
  fallback = ""
) => {
  const group = isConsistentLabel ? 1 : 2;
  return regex.exec(description)?.[group]?.toString().trim() || fallback;
};
const createRegex = (pattern: RegExp) => {
  return new RegExp(pattern.source.replace(/\s\*/g, "\\s*"));
};

export const REGEX = {
  food: createRegex(/(Karma\/Food:|Karma:)([\s\S]*?)(😈|💊)/i),
  tests: createRegex(/Testy:([\s\S]*?)(💉|🐛)/gi),
  warning: createRegex(
    /(❗️UWAGA:|UWAGA:|UWAGI:|❗️|❗ UWAGA:)([\s\S]*?)(Czip|Info dla|--)/gi
  ),
  meds: createRegex(/Leki:([\s\S]*?)(\.\.\.|___|---|nieaktualne|🍽|👱|😌)/gi),
  status: createRegex(/Status:([\s\S]*?)(---|🛏|👮‍♀️|📟)/gi),
  personality: createRegex(
    /(Charakter\/Personality:|Charakter:)([\s\S]*?)(🐶|🪪)/gi
  ),
  castration: createRegex(/Kastracja:([\s\S]*?)🩸/gi),
  age: createRegex(
    /(Płeć, wiek:|Płeć\/wiek:|Szacowany wiek:)([\s\S]*?)(🏠|🐶)/gi
  ),
  dogInteraction: createRegex(/Stosunek do psów:([\s\S]*?)🐱/gi),
  catInteraction: createRegex(/Stosunek do kotów:([\s\S]*?)👶🏻/gi),
  childrenInteraction: createRegex(/Stosunek do dzieci:([\s\S]*?)(👩🏼‍🏫|📟)/gi),
  deworming: createRegex(/Odrobaczanie \(data \+ środek\):([\s\S]*?)(👨🏻‍⚕️|💉)/gi),
  health: createRegex(/Leczenie\/Health:([\s\S]*?)(👨🏻|)/gi),
  story: createRegex(/👩🏼‍🏫 Historia:([\s\S]*?)(✂️|👉)/gi),
  infoForCarer: createRegex(
    /Info dla właścicieli\/opiekunów:([\s\S]*?)Szacowany/gi
  ),
  bed: createRegex(/Legowisko:([\s\S]*?)🦮/gi),
  walk: createRegex(/Spacery:([\s\S]*?)(🍲|🥘|🍽)/gi),
};
const getDetails = (description: string) => {
  const food = getDetailSanitized(description, REGEX.food, false, "zwykła");

  const testsFound = getDetailSanitized(description, REGEX.tests);
  const tests =
    testsFound && testsFound.trim().toLocaleLowerCase() !== "ujemne"
      ? testsFound
      : "";

  const medsFound = getDetailSanitized(description, REGEX.meds);
  const meds = medsFound && medsFound !== "brak" ? medsFound : "";

  const warning = getDetailSanitized(description, REGEX.warning, false);
  const status = getDetailSanitized(description, REGEX.status);
  const personality = getDetailSanitized(description, REGEX.personality, false);
  const castration = getDetailSanitized(description, REGEX.castration);
  const dogInteraction = getDetailSanitized(description, REGEX.dogInteraction);
  const catInteraction = getDetailSanitized(description, REGEX.catInteraction);
  const childrenInteraction = getDetailSanitized(
    description,
    REGEX.childrenInteraction
  );
  const deworming = getDetailSanitized(description, REGEX.deworming);
  const health = getDetailSanitized(description, REGEX.health);
  const story = getDetailSanitized(description, REGEX.story);
  const infoForCarer = getDetailSanitized(description, REGEX.infoForCarer);
  const age = getDetailSanitized(description, REGEX.age, false);
  const bed = getDetailSanitized(description, REGEX.bed);
  const walk = getDetailSanitized(description, REGEX.walk);

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

export const getDetailsHeaders = (
  settings: SettingsFormType,
  details?: Details
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

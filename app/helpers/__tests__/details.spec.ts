import { describe, it, expect } from "vitest";
import getDetails, { getDetailSanitized, REGEX } from "../details";

describe("getDetails", () => {
  it("should get food detail", () => {
    const description =
      "💊 Leki: \n\n🍽 Karma/Food: mokra zwykła  \n\n😈 Charakter/Personality: łagodny (ale czasem syczy)";
    const result = getDetailSanitized(description, REGEX.food, false);
    expect(result).toBe("mokra zwykła");
  });
  
  it("should get warning detail", () => {
    const description = `❗ UWAGA:
Często nie czuje że się załatwia,
wymieniamy mu wszystko codziennie, bo nawet jak nie widać, to sika pod siebie.
Zostawia kupę i pieczątki.
Myjemy dupkę mokrym ręcznikiem papierowym  lub chusteczkami
W razie biegunki pół diadoga lub sanofor
bardzo nie lubi Carlosa! nie puszczać ich razem

Czip

Info dla właścicieli/opiekunów: nie trzyma moczu i kału

🪪 Płeć, wiek: samiec, ok. 4-5 lat (ur. ~2019)
Waga  2.06.25 4,30 kg`;
    const result = getDetailSanitized(description, REGEX.warning, false);
    expect(result).toBe(`Często nie czuje że się załatwia,
wymieniamy mu wszystko codziennie, bo nawet jak nie widać, to sika pod siebie.
Zostawia kupę i pieczątki.
Myjemy dupkę mokrym ręcznikiem papierowym  lub chusteczkami
W razie biegunki pół diadoga lub sanofor
bardzo nie lubi Carlosa! nie puszczać ich razem`);
  });

  it("should extract details from a description string", () => {
    const description =
      "❗ UWAGA:może wyjść na chwilę \n\nCzip\n\nInfo dla właścicieli/opiekunów:\n\n🪪 Płeć, wiek:  facet\n\n🏠 Status: moze isc dondomu dt ds\n\n👮‍♀️ Opiekun/Guardian:\n\n🧚‍♀️ Czyja interwencja:\n\n💊 Leki: \n\n🍽 Karma/Food: mokra zwykła  \n\n😈 Charakter/Personality: łagodny (ale czasem syczy)\n\n🐶 Stosunek do psów: nieznany \n🐱 Stosunek do kotów: nie lubi\n👶🏻 Stosunek do dzieci: nie nadaje się \n\n👩🏼‍🏫 Historia: Kinga J.\n\n✂️ Kastracja: tak ale nie u nas \n\n🩸 Testy: tak fiv dodatni felv ujemny\n\n💉 Szczepienia: tak na choroby zakaźne \n\n🐛 Odrobaczanie (data + środek):\nStrong hold plus 11.08.25\n\n👨🏻‍⚕️ Leczenie/Health:";

    const result = getDetails(description);

    expect(result).toEqual({
      food: "mokra zwykła",
      tests: "tak fiv dodatni felv ujemny",
      warning: "może wyjść na chwilę",
      meds: "",
      status: "moze isc dondomu dt ds",
      personality: "łagodny (ale czasem syczy)",
      castration: "tak ale nie u nas",
      dogInteraction: "nieznany",
      catInteraction: "nie lubi",
      childrenInteraction: "nie nadaje się",
      deworming: "Strong hold plus 11.08.25",
      health: "",
      story: "Kinga J.",
      infoForCarer: "",
      age: "facet",
      bed: "",
      walk: "",
    });
  });
});

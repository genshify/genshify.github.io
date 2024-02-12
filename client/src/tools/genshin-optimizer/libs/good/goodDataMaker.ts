import { ICharacterTalent, IGOOD } from "."; // Import your interfaces
import { AscensionKey, CharacterKey } from "../consts";

export const generateJSON = (data) => {
  //to remove spaces from character name
  const removeSpaces = (input: string) => {
    return input.replace(/\s/g, "");
  };

  const charactersData =
  // ? maps through the characters and store their properties
    data.characters.map((char) => ({
      key: removeSpaces(char.name) as CharacterKey,
      level: parseInt(char.properties.level.val),
      ascension: parseInt(char.properties.ascension.val) as AscensionKey,
      constellation: char.constellationsList.length,
      talent: {
        auto: char.skills.normalAttacks.level,
        skill: char.skills.elementalSkill.level,
        burst: char.skills.elementalBurst.level,
      } as ICharacterTalent,
    }))

  // Create your data object of type IGOOD
  const goodData: IGOOD = {
    format: "GOOD",
    source: "Genshify",
    version: 1,
    characters: charactersData,
    artifacts: [],
    weapons: [],
  };

  // Convert data object to JSON string
  const jsonData = JSON.stringify(goodData, null, 2);
  console.log(jsonData);
};

import { ICharacterTalent, IGOOD, ISubstat } from "."; // Import your interfaces
import { PlayerData } from "../../../../enka";
import {
  ArtifactRarity,
  ArtifactSetKey,
  ArtifactSlotKey,
  AscensionKey,
  CharacterKey,
  LocationCharacterKey,
  LocationKey,
  MainStatKey,
  RefinementKey,
  WeaponKey,
} from "../consts";

export const nameSetter = (name: string): string => {
  // ? This function is used to convert the artifact name to the key
  // some artifact names contain special characters eg. "Gladiator's Finale" and we need to remove them -> "GladiatorsFinale"
  //some artifact names contain the word "of" eg. "Heart of Depth" and we need to capitalize the letter O. -> "HeartOfDepth"

  const specialCharacters = ["'", " "];
  const specialWords = [" of ", " the "];

  let result = name;
  specialWords.forEach((word) => {
    result = result.replace(word, word.charAt(1).toUpperCase() + word.slice(2));
  });
  specialCharacters.forEach((char) => {
    result = result.replace(new RegExp(char, "g"), "");
  });

  return result;
};

const artifactSlotKeySetter = (slot: string) => {
  // ? This function is used to convert the artifact slot name to the key
  // EQUIP_BRACER : flower EQUIP_NECKLACE : plume (feather)
  // EQUIP_RING : sands EQUIP_SHOES : goblet EQUIP_DRESS : circlet

  switch (slot) {
    case "EQUIP_BRACER":
      return "flower";
    case "EQUIP_NECKLACE":
      return "plume";
    case "EQUIP_RING":
      return "goblet";
    case "EQUIP_SHOES":
      return "sands";
    case "EQUIP_DRESS":
      return "circlet";
    default:
      return "flower";
  }
};

const artifactStatKeySetter = (stat: string) => {
  // ? This function is used to convert the main stat and substat name to the key
  // FIGHT_PROP_HP : hp FIGHT_PROP_ATTACK : "atk" FIGHT_PROP_DEFENSE : "def"
  // FIGHT_PROP_HP_PERCENT : "hp_" FIGHT_PROP_ATTACK_PERCENT : "atk_" FIGHT_PROP_DEFENSE_PERCENT : "def_"
  //FIGHT_PROP_ELEMENT_MASTERY : "eleMas" FIGHT_PROP_CHARGE_EFFICIENCY : "enerRech_"
  //FIGHT_PROP_CRITICAL : "critRate" FIGHT_PROP_CRITICAL_HURT : "critDMG" FIGHT_PROP_HEAL_ADD : "heal_"
  //FIGHT_PROP_PHYSICAL_ADD_HURT : "physical_dmg_" FIGHT_PROP_FIRE_ADD_HURT : "pyro_dmg_" FIGHT_PROP_WATER_ADD_HURT : "hydro_dmg_"
  //FIGHT_PROP_ELEC_ADD_HURT : "electro_dmg_" FIGHT_PROP_GRASS_ADD_HURT : "dendro_dmg_" FIGHT_PROP_ICE_ADD_HURT : "cryo_dmg_"
  //FIGHT_PROP_ROCK_ADD_HURT : "geo_dmg_" FIGHT_PROP_WIND_ADD_HURT : "anemo_dmg_"

  switch (stat) {
    case "FIGHT_PROP_HP":
      return "hp";
    case "FIGHT_PROP_ATTACK":
      return "atk";
    case "FIGHT_PROP_DEFENSE":
      return "def";
    case "FIGHT_PROP_HP_PERCENT":
      return "hp_";
    case "FIGHT_PROP_ATTACK_PERCENT":
      return "atk_";
    case "FIGHT_PROP_DEFENSE_PERCENT":
      return "def_";
    case "FIGHT_PROP_ELEMENT_MASTERY":
      return "eleMas";
    case "FIGHT_PROP_CHARGE_EFFICIENCY":
      return "enerRech_";
    case "FIGHT_PROP_CRITICAL":
      return "critRate_";
    case "FIGHT_PROP_CRITICAL_HURT":
      return "critDMG_";
    case "FIGHT_PROP_HEAL_ADD":
      return "heal_";
    case "FIGHT_PROP_PHYSICAL_ADD_HURT":
      return "physical_dmg_";
    case "FIGHT_PROP_FIRE_ADD_HURT":
      return "pyro_dmg_";
    case "FIGHT_PROP_WATER_ADD_HURT":
      return "hydro_dmg_";
    case "FIGHT_PROP_ELEC_ADD_HURT":
      return "electro_dmg_";
    case "FIGHT_PROP_GRASS_ADD_HURT":
      return "dendro_dmg_";
    case "FIGHT_PROP_ICE_ADD_HURT":
      return "cryo_dmg_";
    case "FIGHT_PROP_ROCK_ADD_HURT":
      return "geo_dmg_";
    case "FIGHT_PROP_WIND_ADD_HURT":
      return "anemo_dmg_";
    default:
      console.log("stat not found", stat);
  }
};

export const generateJSON = (data: PlayerData) => {

  // functions to convert the data to the format of the good data
  const charactersData =
    // ? maps through the characters and store their properties
    data.characters.map((char) => ({
      key: nameSetter(char.name) as CharacterKey,
      level: parseInt(char.properties.level.val),
      ascension: parseInt(char.properties.ascension.val) as AscensionKey,
      constellation: char.constellationsList.length,
      talent: {
        auto: char.skills.normalAttacks.level,
        skill: char.skills.elementalSkill.level,
        burst: char.skills.elementalBurst.level,
      } as ICharacterTalent,
    }));

  const artifactsData = data.characters.flatMap((char) =>
    // ? maps through the artifacts and store their properties
    char.equipment.artifacts.map((art) => ({
      setKey: nameSetter(art.setName) as ArtifactSetKey,
      slotKey: artifactSlotKeySetter(art.equipType) as ArtifactSlotKey,
      level: art.level - 1 || 0,
      rarity: art.stars as ArtifactRarity,
      mainStatKey: artifactStatKeySetter(art.mainstat.stat) as MainStatKey,
      location: (nameSetter(char.name) as LocationCharacterKey) || "",
      lock: false,
      mainStatVal: art.mainstat.statValue,
      substats: art.substats.map((substat) => ({
        key: artifactStatKeySetter(substat.stat),
        value: substat.statValue,
      })) as ISubstat[],
    }))
  );

  const weaponData = data.characters.map((char) =>({
    // ? maps through the weapons and store their properties
    key : nameSetter(char.equipment.weapon.name) as WeaponKey,
    level : char.equipment.weapon.level,
    ascension : char.equipment.weapon.ascensionLevel as AscensionKey,
    refinement : char.equipment.weapon.refinement.level as RefinementKey,
    location : (nameSetter(char.name) as LocationKey),
    lock : false,
  })

  );

  // Create your data object of type IGOOD
  const goodData: IGOOD = {
    format: "GOOD",
    source: "Genshify",
    version: 1,
    characters: charactersData,
    artifacts: artifactsData,
    weapons: weaponData,
  };

  // Convert data object to JSON string
  const jsonData = JSON.stringify(goodData, null, 2);
  return jsonData;
};

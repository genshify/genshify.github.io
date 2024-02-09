import { test2 } from "../pages/Showcase/test2";
import loc from "../assets/jsons/loc.json";
import char from "../assets/jsons/characters.json";

const locData: any = loc;
const charData: any = char;

export const calculateAllStats = (index: number) => {
  try {
    const characterInfo :any = test2.avatarInfoList[index];
    const avatarId: number = characterInfo.avatarId;
    const name = locData.en[charData[avatarId].nameTextMapHash];
    const energy = Math.round(characterInfo.fightPropMap[23] * 100) || "";
    const critRate = Math.round(characterInfo.fightPropMap[20] * 100) || "";
    const critDmg = Math.round(characterInfo.fightPropMap[22] * 100) || "";
    const healBonus = Math.round(characterInfo.fightPropMap[21] * 100) || 0;
    const elementalMastery =
      characterInfo.fightPropMap[28] * 100 || 0;
    const incomeHealBonus =
      Math.round(characterInfo.fightPropMap[21] * 100) || 0;

    const ElementalRes: object = {
      physical: Math.round(characterInfo.fightPropMap[29] || 0 * 100),
      pyro: Math.round(characterInfo.fightPropMap[50] || 0 * 100),
      electro: Math.round(characterInfo.fightPropMap[51] || 0 * 100),
      hydro: Math.round(characterInfo.fightPropMap[52] || 0 * 100),
      dendro: Math.round(characterInfo.fightPropMap[53] || 0 * 100),
      anemo: Math.round(characterInfo.fightPropMap[54] || 0 * 100),
      geo: Math.round(characterInfo.fightPropMap[55] || 0 * 100),
      cryo: Math.round(characterInfo.fightPropMap[56] || 0 * 100),
    };

    const ElementalDmgBonus: object = {
      physical: Math.round(characterInfo.fightPropMap[30] || 0 * 100),
      pyro: Math.round(characterInfo.fightPropMap[40] || 0 * 100),
      electro: Math.round(characterInfo.fightPropMap[41] || 0 * 100),
      hydro: Math.round(characterInfo.fightPropMap[42] || 0 * 100),
      dendro: Math.round(characterInfo.fightPropMap[43] || 0 * 100),
      anemo: Math.round(characterInfo.fightPropMap[44] || 0 * 100),
      geo: Math.round(characterInfo.fightPropMap[45] || 0 * 100),
      cryo: Math.round(characterInfo.fightPropMap[46] || 0 * 100),
    };

    const energyCost: object = {
      pyro: Math.round(characterInfo.fightPropMap[70] || 0 * 100),
      electro: Math.round(characterInfo.fightPropMap[71] || 0 * 100),
      hydro: Math.round(characterInfo.fightPropMap[72] || 0 * 100),
      dendro: Math.round(characterInfo.fightPropMap[73] || 0 * 100),
      anemo: Math.round(characterInfo.fightPropMap[74] || 0 * 100),
      cryo: Math.round(characterInfo.fightPropMap[75] || 0 * 100),
      geo: Math.round(characterInfo.fightPropMap[76] || 0 * 100),
    };

    const coolDownReduction = Math.round(
      characterInfo.fightPropMap[80] || 0 * 100
    );

    const shiedStrength = Math.round(
      characterInfo.fightPropMap[81] || 0 * 100
    );

    const maxHp = Math.round(characterInfo.fightPropMap[2000]);
    const maxAtk = Math.round(characterInfo.fightPropMap[2001]);
    const maxDef = Math.round(characterInfo.fightPropMap[2002]);

    return {
      name: name,
      energy: energy,
      critRate: critRate,
      critDmg: critDmg,
      healBonus: healBonus,
      elementalMastery: elementalMastery,
      incomeHealBonus: incomeHealBonus,
      ElementalRes: ElementalRes,
      ElementalDmgBonus: ElementalDmgBonus,
      energyCost: energyCost,
      coolDownReduction: coolDownReduction,
      shiedStrength: shiedStrength,
      maxHp: maxHp,
      maxAtk: maxAtk,
      maxDef: maxDef,
    };
  } catch (error) {
    console.log("error calculating stats", error);
  }
};

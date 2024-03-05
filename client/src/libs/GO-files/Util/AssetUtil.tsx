import type { CharacterKey, GenderKey } from "genshin-optimizer/consts";
import { characterAsset } from "genshin-optimizer/assets";

export function iconAsset(
  cKey: CharacterKey,
  gender: GenderKey,
) {
  const genshinAsset = characterAsset(cKey, "icon", gender);
  return genshinAsset || "";
}

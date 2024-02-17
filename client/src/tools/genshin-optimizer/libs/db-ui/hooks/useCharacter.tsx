import type { CharacterKey } from "genshin-optimizer/consts";
import { useDataManagerBase } from "genshin-optimizer/database-ui";
import { useDatabase } from "./useDatabase";

export function useCharacter(characterKey: CharacterKey) {
  const database = useDatabase();
  return useDataManagerBase(database.chars, characterKey);
}

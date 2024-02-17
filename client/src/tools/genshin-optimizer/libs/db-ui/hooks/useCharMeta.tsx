import { useDataManagerBase } from "genshin-optimizer/database-ui";
import type { CharacterKey } from "genshin-optimizer/consts";
import { useDatabase } from "./useDatabase";

export function useCharMeta(key: CharacterKey) {
  const database = useDatabase();
  return useDataManagerBase(database.charMeta, key);
}

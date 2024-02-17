import { useDataEntryBase } from "genshin-optimizer/database-ui";
import { useDatabase } from "./useDatabase";

export function useDBMeta() {
  const database = useDatabase();
  return useDataEntryBase(database.dbMeta);
}

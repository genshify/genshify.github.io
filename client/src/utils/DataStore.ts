import { useContext } from "react";
import { DatabaseContext } from "genshin-optimizer/db-ui";
import { SandboxStorage } from "genshin-optimizer/database";
import { ArtCharDatabase } from "genshin-optimizer/db";

export function useDataStore() {
  const { databases, setDatabase } = useContext(DatabaseContext);
  const dataStore = (
    playerData: string,
    index: 1 | 2 | 3 | 4,
    keepNotInImport: boolean,
    ignoreDups: boolean
  ) => {
    const database = databases[index-1];
    if (!playerData) return undefined;

    let parsed;
    try {
      parsed = JSON.parse(playerData);
      if (typeof parsed !== "object") {
        console.error("Error parsing JSON data");
        return undefined;
      }
    } catch (e) {
      console.error("Error parsing JSON data:", e);
      return undefined;
    }

    // Check the format of parsed data
    if (parsed.format === "GOOD") {
      const copyStorage = new SandboxStorage();
      copyStorage.copyFrom(database.storage);
      const importedDatabase = new ArtCharDatabase(index, copyStorage);
      const importResult = importedDatabase.importGOOD(
        parsed,
        keepNotInImport,
        ignoreDups
      );

      if (!importResult) {
        console.error("Invalid data format");
        return undefined;
      }

      importedDatabase.swapStorage(database);
      setDatabase(index, importedDatabase);
      return importedDatabase;
    } else {
      console.error("Unknown data format");
      return undefined;
    }
  };

  return dataStore;
}

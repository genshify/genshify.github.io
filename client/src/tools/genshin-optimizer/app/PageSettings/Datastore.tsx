
import { DatabaseContext } from "genshin-optimizer/db-ui";
import { useContext, useState } from "react";
import { SandboxStorage } from "genshin-optimizer/database";
import { ArtCharDatabase } from "genshin-optimizer/db";

export function DataStore(playerData: string) {
const index = 0;
  const { databases, setDatabase } = useContext(DatabaseContext);
  console.log(databases);
  const database = databases[index];
  const data = playerData;
  const [keepNotInImport, setKeepNotInImport] = useState(false);
  const [ignoreDups, setIgnoreDups] = useState(false);
  if (!data) return undefined;
  let parsed: any;
  try {
    parsed = JSON.parse(data);
    if (typeof parsed !== "object") {
      console.log("error1");
      return undefined;
    }
  } catch (e) {
    console.log("error2");
    return undefined;
  }
  if (parsed.format === "GOOD") {
    // Parse as GOOD format
    const copyStorage = new SandboxStorage();
    copyStorage.copyFrom(database.storage);
    const importedDatabase = new ArtCharDatabase(1, copyStorage);

    const importResult = importedDatabase.importGOOD(
      parsed,
      keepNotInImport,
      ignoreDups
    );
    if (!importResult) {
      console.log("invalid data");
      return undefined;
    }

    importedDatabase.swapStorage(database);
    setDatabase(1, importedDatabase);
    //   console.log(databases[1]);

    //   importedDatabase.toExtraLocalDB();
  }
  //   console.log("unknown type");
  return undefined;
}

//   function GOUploadAction({
//     index,
//     importedDatabase,
//     reset,
//   }: {
//     index: number;
//     importedDatabase?: ArtCharDatabase;
//     reset: () => void;
//   }) {
//     const { databases, setDatabase } = useContext(DatabaseContext);
//     const database = databases[index];
//     const { t } = useTranslation("settings");
//     const replaceDB = useCallback(() => {
//       if (!importedDatabase) return;
//       importedDatabase.swapStorage(database);
//       setDatabase(index, importedDatabase);
//       importedDatabase.toExtraLocalDB();
//       reset();
//     }, [database, index, importedDatabase, reset, setDatabase]);
//   }
// }

// export function DataStore(playerData) {
//   const { databases } = useContext(DatabaseContext);
//   const database = databases[1];
//   const [data, setdata] = useState("");
//   const [filename, setfilename] = useState("");
//   const [errorMsg, setErrorMsg] = useState(""); // TODO localize error msg
//   const [keepNotInImport, setKeepNotInImport] = useState(false);
//   const [ignoreDups, setIgnoreDups] = useState(false);
//   const { importResult, importedDatabase } =
//     useMemo(() => {
//       if (!data) return undefined;
//       let parsed: any;
//       try {
//         parsed = JSON.parse(data);
//         if (typeof parsed !== "object") {
//           setErrorMsg("uploadCard.error.jsonParse");
//           return undefined;
//         }
//       } catch (e) {
//         setErrorMsg("uploadCard.error.jsonParse");
//         return undefined;
//       }
//       // Figure out the file format
//       if (parsed.format === "GOOD") {
//         // Parse as GOOD format
//         const copyStorage = new SandboxStorage();
//         copyStorage.copyFrom(database.storage);
//         const importedDatabase = new ArtCharDatabase(
//           (index + 1) as 1 | 2 | 3 | 4,
//           copyStorage
//         );
//         const importResult = importedDatabase.importGOOD(
//           parsed,
//           keepNotInImport,
//           ignoreDups
//         );
//         if (!importResult) {
//           setErrorMsg("uploadCard.error.goInvalid");
//           return undefined;
//         }

//         return { importResult, importedDatabase };
//       }
//       setErrorMsg("uploadCard.error.unknown");
//       return undefined;
//     }, [data, database, keepNotInImport, ignoreDups, index]) ?? {};

//   const onUpload = async (e) => {
//     const file = e.target.files[0];
//     e.target.value = null; // reset the value so the same file can be uploaded again...
//     if (file) setfilename(file.name);
//     const reader = new FileReader();
//     reader.onload = () => setdata(reader.result as string);
//     reader.readAsText(file);
//   };

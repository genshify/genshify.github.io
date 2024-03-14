import { useDatabase } from "genshin-optimizer/db-ui";
import { useEffect, useState } from "react";

export default function useDisplayArtifact() {
  const database = useDatabase();
  const [artifactDisplayState, setArtifactDisplayState] = useState(
    database.displayArtifact.get()
  );
  useEffect(
    () =>
      database.displayArtifact.follow((_r, disArt) =>
        setArtifactDisplayState(disArt)
      ),
    [database]
  );
  return artifactDisplayState;
}

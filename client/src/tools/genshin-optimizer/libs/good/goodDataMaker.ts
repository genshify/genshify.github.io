import { IGOOD } from "."; // Import your interfaces

export const generateJSON = (data) => {
  // Create your data object of type IGOOD
  const playerData: IGOOD = {
    format: "GOOD",
    source: "Genshify",
    version: 1,
    characters: [
      {
        key: "KaedeharaKazuha",
        level: 1,
        ascension: 0,
        constellation: 0,
        talent: { auto: 1, skill: 1, burst: 1 },
      },
    ],
    artifacts: [],
    weapons: [],
  };

  // Convert data object to JSON string
  const jsonData = JSON.stringify(playerData, null, 2);
  console.log(jsonData);
};

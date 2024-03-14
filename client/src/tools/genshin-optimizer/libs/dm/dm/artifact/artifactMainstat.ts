import { layeredAssignment } from "genshin-optimizer/util";
import type { MainStatKey } from "../../mapping";
import { MainPropMap } from "../../mapping";



export type artifaceMainstatData = {
  [rank: number]: Record<MainStatKey, number[]>;
};

export const artifactMainstatData = {} as artifaceMainstatData;

//create the general shape of artifactMainstatData
Array.from({ length: 5 }, (_, i) => i + 1).forEach((rank) => {
  Object.values(MainPropMap).forEach((element) => {
    layeredAssignment(artifactMainstatData, [rank, element], []);
  });
});

//populate the arrays from the data.




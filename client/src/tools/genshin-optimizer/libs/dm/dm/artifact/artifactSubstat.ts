import { layeredAssignment } from "genshin-optimizer/util";
import type {  SubstatKey } from "../../mapping";
import { SubStatPropTypeMap } from "../../mapping";




type artifaceSubstatData = {
  [Rarity: number]: Record<SubstatKey, number[]>;
};

const artifactSubstatData = {} as artifaceSubstatData;

//create the general shape of artifactSubstatData
Array.from({ length: 5 }, (_, i) => i + 1).forEach((rank) => {
  Object.values(SubStatPropTypeMap).forEach((element) => {
    layeredAssignment(artifactSubstatData, [rank, element], []);
  });
});



export { artifactSubstatData };

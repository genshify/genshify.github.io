import type { IArtifact, ISubstat } from "genshin-optimizer/good";
export interface ICachedArtifact extends IArtifact {
  id: string;
  mainStatVal: number;
  substats: ICachedSubstat[];
  probability?: number;
}

export interface ICachedSubstat extends ISubstat {
  rolls: number[];
  efficiency: number;
  accurateValue: number;
}

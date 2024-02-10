export interface character {
  name: string;
  assets: { icon: string | number 
    sideIcon: string | number};
  element: string;

  maxLevel: string | number;
  stats: {
    maxHp: { value: number };
    atk: { value: number };
    def: { value: number };
  };
}

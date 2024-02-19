import { PlayerData } from "..";

export class CacheHandler {
  constructor() {}

  set(key: string, value: PlayerData | undefined) {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const cachedValue = localStorage.getItem(key);
    return cachedValue ? JSON.parse(cachedValue) : undefined;
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}

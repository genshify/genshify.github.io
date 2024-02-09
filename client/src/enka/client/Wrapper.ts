import { WrapperOptions } from "../types";
import { GenshinClient } from "./Genshin/GenshinClient";

/**
 * A class for building the Wrapper.
 */
export class Wrapper {
  /**
   * The client for Genshin Impact.
   */
  readonly genshin: GenshinClient;

  /**
   * The client for Star Rail.
   */

  /**
   * Creates a new `Wrapper` instance.
   * @param options - The options for the wrapper.
   * @param options.userAgent - The User Agent used in the request. If not specified, the default User Agent will be used.
   * @param options.language - The language to get the names. If not specified, the default language will be used.
   * @param options.cache - Specify if you want to get cached data.
   */
  constructor(options?: WrapperOptions) {
    this.genshin = new GenshinClient(options);
  }
}

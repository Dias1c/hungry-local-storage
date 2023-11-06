import { HungryLocalStorage } from "./HungryLocalStorage/HungryLocalStorage.js";

/**
 * hls - (HungryLocalStorage) providing a set of methods and functionality 
 * for managing data in `localStorage` with built-in expiration time handling. 
 * It encapsulates the core logic of the library and simplifies the process of storing, 
 * retrieving, and managing data in the local storage of a web browser.
 */
export const hls = new HungryLocalStorage()
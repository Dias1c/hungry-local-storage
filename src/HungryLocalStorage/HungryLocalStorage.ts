import { getCurrentTimestamp } from "../time/getCurrentTimestamp.js";
import { getExpirationTimestamp } from "../time/getExpirationTimestamp.js";
import { TExpiration } from "../time/types.js";
import { parseItem } from "./parseItem.js";
import { isExpired } from "./isExpired.js";
import { isInstanceOfIHungryLocalStorageItem } from "./isInstanceOfIHungryLocalStorageItem.js";
import { IHungryLocalStorageItem } from "./types.js";

/**
 * HungryLocalStorage - providing a set of methods and functionality 
 * for managing data in `localStorage` with built-in expiration time handling. 
 * It encapsulates the core logic of the library and simplifies the process of storing, 
 * retrieving, and managing data in the local storage of a web browser.
 */
export class HungryLocalStorage {
  private autoFlushEverySeconds?: number
  private autoFlushChangesCount: number = 0

  /**
   * This method is used to store data in `localStorage` with a specified expiration time.
   * 
   * @param key - The key under which the data will be stored in localStorage.
   * @param value - The data value to be stored.
   * @param expiration - The expiration time in [`unix timestamp`](https://www.unixtimestamp.com/) (if a number is provided) or an object with fields specifying expiration in seconds, minutes, hours, days, weeks, months, and years.
   * @returns Returns true if set rewrited existing `localStorage` item by key, otherwise false
   */
  public set(key: string, value: any, expiration?: TExpiration): boolean {
    let expiredAt: number | undefined = undefined
    if (expiration != undefined) {
      expiredAt = getExpirationTimestamp(expiration)
    }

    const item: IHungryLocalStorageItem = {
      creation: getCurrentTimestamp(),
      data: value,
      expiration: expiredAt,
    }

    const isRewriting = localStorage.getItem(key) != null
    localStorage.setItem(key, JSON.stringify(item))
    return isRewriting
  }

  /**
   * This method is used to retrieve data from `localStorage` with expiration checking.
   * 
   * @param key - The key from which to retrieve the data.
   * @returns - The data value if it hasn't expired; otherwise, null. If item expired, it removes it from `localStorage`, and returns `null`.
   */
  public get(key: string): any | null {
    const item = localStorage.getItem(key)
    if (item == null) return null

    let parsedItem = parseItem(item)
    if (!isInstanceOfIHungryLocalStorageItem(parsedItem)) return parsedItem
    if (isExpired(parsedItem)) {
      localStorage.removeItem(key)
      return null
    }
    return parsedItem.data
  }

  /**
   * Checks if the item with the specified key in `localStorage` has expired.
   *
   * @param key - The key of the item to check for expiration.
   * @returns `true` if the item has expired or doesn't exist, `false` otherwise.
   */
  public isExpired(key: string): boolean {
    const item = localStorage.getItem(key)
    if (item == null) return true

    const parsedItem = parseItem(item)
    if (!isInstanceOfIHungryLocalStorageItem(parsedItem)) return false
    return isExpired(parsedItem)
  }

  /**
   * This method deletes an item from `localStorage` based on the provided key.
   * 
   * @param key - The key of the item to be removed.
   */
  public remove(key: string) {
    localStorage.removeItem(key)
  }

  /**
   * This method removes all expired items from `localStorage`.
   * 
   * @returns The count of removed items. 
   */
  public flush(): number {
    if (localStorage.length == 0) return 0

    let flushed = 0
    const keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
      if (!this.isExpired(keys[i])) continue
      localStorage.removeItem(keys[i])
      flushed++
    }

    return flushed
  }

  /**
   * This method sets up automatic clearing of `localStorage` with a specified time interval.
   * @param flushEverySeconds - The auto-flush interval in seconds (if a number is provided) or null to disable auto-flushing. 
   */
  public setAutoFlush(flushEverySeconds: number | null) {
    this.autoFlushChangesCount++
    this.autoFlushEverySeconds = flushEverySeconds ?? undefined
    if (!flushEverySeconds) return

    const autoFlushUpdatedCount = this.autoFlushChangesCount
    const shouldStopAutoFlush = (): boolean => {
      if (!this.autoFlushEverySeconds) return true
      if (autoFlushUpdatedCount != this.autoFlushChangesCount) return true
      if (flushEverySeconds != this.autoFlushEverySeconds) return true
      return false
    }

    const autoFlush = () => {
      if (shouldStopAutoFlush()) return

      this.flush()
      setTimeout(autoFlush, flushEverySeconds * 1000)
    }
    setTimeout(autoFlush, flushEverySeconds * 1000)
  }
}

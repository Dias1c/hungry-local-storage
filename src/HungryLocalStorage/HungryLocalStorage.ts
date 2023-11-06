import { getCurrentTimestamp } from "../time/getCurrentTimestamp.js";
import { getExpirationTimestamp } from "../time/getExpirationTimestamp.js";
import { TExpiration } from "../time/types.js";
import { parseItem } from "./parseItem.js";
import { isExpired } from "./isExpired.js";
import { isInstanceOfIHungryLocalStorageItem } from "./isInstanceOfIHungryLocalStorageItem.js";
import { IHungryLocalStorageItem } from "./types.js";

export class HungryLocalStorage {
  private autoFlushEverySeconds?: number
  private autoFlushChangesCount: number = 0

  public set(key: string, value: any, expiration?: TExpiration): boolean {
    const item: IHungryLocalStorageItem = {
      creation: getCurrentTimestamp(),
      data: value,
      expiration: expiration && getExpirationTimestamp(expiration)
    }

    const isRewriting = localStorage.getItem(key) != null
    localStorage.setItem(key, JSON.stringify(item))
    return isRewriting
  }

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

  public isExpired(key: string): boolean {
    const item = localStorage.getItem(key)
    if (item == null) return true

    const parsedItem = parseItem(item)
    if (!isInstanceOfIHungryLocalStorageItem(parsedItem)) return false
    return isExpired(parsedItem)
  }

  public remove(key: string) {
    localStorage.removeItem(key)
  }

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

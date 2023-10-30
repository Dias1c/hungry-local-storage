import { getCurrentTimestamp } from "../time/getCurrentTimestamp";
import { getExpirationTimestamp } from "../time/getExpirationTimestamp";
import { TExpiration } from "../time/types";
import { parseItem } from "./parseItem";
import { isExpired } from "./isExpired";
import { isInstanceOfIHungryLocalStorageItem } from "./isInstanceOfIHungryLocalStorageItem";
import { IHungryLocalStorageItem } from "./types";

export class HungryLocalStorage {
  private autoFlushEverySeconds?: number

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

  public get(key: string): any {
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
    this.autoFlushEverySeconds = flushEverySeconds ?? undefined
    if (!flushEverySeconds) return

    const autoFlush = () => {
      if (!this.autoFlushEverySeconds) return
      if (flushEverySeconds != this.autoFlushEverySeconds) return
      setTimeout(autoFlush, flushEverySeconds * 1000)
    }
    setTimeout(autoFlush, flushEverySeconds * 1000)
  }
}

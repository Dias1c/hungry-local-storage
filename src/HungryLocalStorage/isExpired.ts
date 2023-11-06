import { getCurrentTimestamp } from "../time/getCurrentTimestamp.js"
import { IHungryLocalStorageItem } from "./types.js"

export function isExpired(item: IHungryLocalStorageItem): boolean {
  if (item.expiration == undefined) return false
  if (typeof item.expiration != 'number') return false
  return item.expiration <= getCurrentTimestamp()
}
import { getCurrentTimestamp } from "../time/getCurrentTimestamp"
import { IHungryLocalStorageItem } from "./types"

export function isExpired(item: IHungryLocalStorageItem): boolean {
  if (item.expiration == undefined) return false
  if (typeof item.expiration != 'number') return false
  return item.expiration <= getCurrentTimestamp()
}
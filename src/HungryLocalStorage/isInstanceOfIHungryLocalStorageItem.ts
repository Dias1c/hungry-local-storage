import { IHungryLocalStorageItem } from "./types"

export function isInstanceOfIHungryLocalStorageItem(obj: any): obj is IHungryLocalStorageItem {
  if (typeof obj != 'object') return false
  if (!('creation' in obj)) return false
  if (!('data' in obj)) return false
  return true
}
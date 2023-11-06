export function parseItem(item: string): any {
  try {
    return JSON.parse(item)
  } catch {
    return item
  }
}
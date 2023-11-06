export function getCurrentTimestamp(): number {
  return Math.floor((new Date()).getTime() / 1000)
}

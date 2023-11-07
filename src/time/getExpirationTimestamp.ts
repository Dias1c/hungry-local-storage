import { DurationInSeconds } from "./DurationInSeconds.js"
import { getCurrentTimestamp } from "./getCurrentTimestamp.js"
import { TExpiration } from "./types.js"

/**
 * Returns a [`unix timestamp`](https://www.unixtimestamp.com/) based on the received data. If `expiration` type is number, returns this value, otherwise **if it's object**, it adds time to current timestamp (now + seconds + days + hours + ...). 
 * 
 * @returns A `unix timestamp` representing the future expiration time.
 */
export function getExpirationTimestamp(expiration: TExpiration): number {
  if (typeof expiration === 'number') return expiration

  let result = getCurrentTimestamp()
  if (expiration.seconds) result += expiration.seconds
  if (expiration.minutes) result += expiration.minutes * DurationInSeconds.minutes()
  if (expiration.hours) result += expiration.hours * DurationInSeconds.hours()
  if (expiration.days) result += expiration.days * DurationInSeconds.days()
  if (expiration.weeks) result += expiration.weeks * DurationInSeconds.weeks()
  if (expiration.months) result += expiration.months * DurationInSeconds.months()
  if (expiration.years) result += expiration.years * DurationInSeconds.years()

  return result
}

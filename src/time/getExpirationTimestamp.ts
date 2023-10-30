import { DurationInSeconds } from "./DurationInSeconds"
import { getCurrentTimestamp } from "./getCurrentTimestamp"
import { TExpiration } from "./types"

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

const MINUTES_IN_SECONDS = 60
const HOURS_IN_SECONDS = 60 * MINUTES_IN_SECONDS
const DAYS_IN_SECONDS = 24 * HOURS_IN_SECONDS
const WEEKS_IN_SECONDS = 7 * DAYS_IN_SECONDS
const MONTHS_IN_SECONDS = 30.4375 * DAYS_IN_SECONDS
const YEARS_IN_SECONDS = 365.25 * DAYS_IN_SECONDS

export class DurationInSeconds {
  public static minutes(): number {
    return MINUTES_IN_SECONDS
  }

  public static hours(): number {
    return HOURS_IN_SECONDS
  }

  public static days(): number {
    return DAYS_IN_SECONDS
  }

  public static weeks(): number {
    return WEEKS_IN_SECONDS
  }

  public static months(): number {
    return MONTHS_IN_SECONDS
  }

  public static years(): number {
    return YEARS_IN_SECONDS
  }
}
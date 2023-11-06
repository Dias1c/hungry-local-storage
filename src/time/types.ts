export interface IExpirationAfterProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
  weeks?: number
  months?: number
  years?: number
}

export type TExpiration = IExpirationAfterProps | number

import { ICountry } from './location'

export type IParcel =
{
  SKU: string
  description:string
  street: string
  town: string
  country:string
  deliveryDate: Date
}

export type IParcelParams = {
  page: number
  size: number
  country?: number
  description?: string
}

export type IParcelData =
  {
    id: string
    SKU: string
    description:string
    street: string
    town: string
    country:ICountry
    deliveryDate: Date
  }

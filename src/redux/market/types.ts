import { ProductCardType } from '../../components/ProductCard/types'

export interface Market {
    id: string
    name: string
    email: string
    image: string
    priceDelivery: string
    timeDelivery: string
    filters: string[]
    food: ProductCardType[]
}

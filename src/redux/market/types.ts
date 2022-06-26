import { ProductCardType } from '../../components/ProductCard/types'

export interface Orders {
    id: string
    address: string
    date: string
    delivery: string
    name: string
    order: { title: string; count: number; price: number; id: string }[]
    phone: string
    totalPrice: number
    restarautName: string
}

export interface Market {
    id: string
    name: string
    email: string
    image: string
    priceDelivery: string
    timeDelivery: string
    filters: string[]
    food: ProductCardType[]
    orders: Orders[]
}

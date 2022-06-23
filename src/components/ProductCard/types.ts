import { Market } from '../../redux/market/types'

export interface ProductCardType {
    id: string
    image: string
    title: string
    description: string
    gramm?: string
    calories?: string
    price: number
    filter: string
}

export interface ProductFormProps {
    id: string
    image: string
    title: string
    description: string
    gramm?: string
    calories?: string
    price: string
    token: string | null
    market: Market | null
    changeEditing: () => void
}

export interface SubmitForm {
    title?: string
    description?: string
    price?: number
}

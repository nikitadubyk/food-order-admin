import React from 'react'
import { ProductCardType } from '../ProductCard/types'

import ProductCard from '../ProductCard'

import './ProductList.scss'

interface ProductListProps {
    products: ProductCardType[]
}

const ProductsList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div id='products' className='products__wrapper'>
            {products &&
                products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
        </div>
    )
}

export default ProductsList

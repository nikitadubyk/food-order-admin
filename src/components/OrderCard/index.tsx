import React from 'react'
import { Orders } from '../../redux/market/types'

import style from './OrderCard.module.scss'

const OrderCard: React.FC<Orders> = ({
    address,
    date,
    delivery,
    name,
    order,
    phone,
    totalPrice,
}) => {
    return (
        <div className={style.order__card}>
            <p>
                <span>Дата заказа:</span> {date}
            </p>
            <p>
                <span>Тип доставки:</span> {delivery}
            </p>
            <p>
                <span>Адрес:</span> {address}
            </p>
            <p>
                <span>Имя:</span> {name}
            </p>
            <p>
                <span>Телефон:</span> {phone}
            </p>

            <div className={style.order__card__wrapper}>
                {order.map(order => (
                    <div className={style.order__card__info}>
                        <div className={style.order__card__info__title}>
                            {order.title}
                        </div>
                        <p>Количество: {order.count}</p>
                        <p>Цена: {order.price} ₽</p>
                    </div>
                ))}
            </div>

            <p>
                <span>Итого:</span> {totalPrice} ₽
            </p>
        </div>
    )
}

export default OrderCard

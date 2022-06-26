import React from 'react'
import { useSelector } from 'react-redux'
import { selectMarket } from '../../redux/market/selector'
import { Market } from '../../redux/market/types'

import Header from '../../components/Header'
import StatsCard from '../../components/StatsCard'
import OrderCard from '../../components/OrderCard'

import './Orders.scss'

const Orders: React.FC = () => {
    const { market } = useSelector(selectMarket)

    const averageOrderBill = (market: Market) => {
        const totalPrice = market.orders.reduce(
            (sum, obj) => sum + obj.totalPrice,
            0
        )

        return (totalPrice / market.orders.length).toFixed(0)
    }

    return (
        <>
            <Header />

            <div className='container'>
                {market && (
                    <div className='orders'>
                        <div className='orders__stats'>
                            <h2>Статистика по заказам</h2>

                            <div className='orders__stats__info'>
                                <StatsCard
                                    title='Количество заказов'
                                    data={market.orders.length}
                                />

                                <StatsCard
                                    title='Общая сумма заказов'
                                    data={`${market.orders.reduce(
                                        (sum, obj) => sum + obj.totalPrice,
                                        0
                                    )} ₽`}
                                />

                                <StatsCard
                                    title='Средний чек заказа'
                                    data={`${averageOrderBill(market)} ₽`}
                                />
                            </div>
                        </div>

                        <h2>Заказы</h2>

                        {market.orders.map(order => (
                            <OrderCard key={order.id} {...order} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Orders

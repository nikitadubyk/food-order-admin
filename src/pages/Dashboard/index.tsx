import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/hooks'
import { fetchMarketInfo } from '../../redux/market/slice'

import { selectMarket } from '../../redux/market/selector'
import { selectAuth } from '../../redux/auth/selector'

import Header from '../../components/Header'
import ProductsList from '../../components/ProductsList'
import Spinner from '../../components/Spinner'
import NewProduct from '../../components/NewProduct'
import FiltersList from '../../components/FiltersList'

import './Dashboard.scss'

const Dashboard: React.FC = () => {
    const { token } = useSelector(selectAuth)
    const { market, loadingStatus } = useSelector(selectMarket)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchMarketInfo(token))
    }, [dispatch, token])

    return (
        <>
            <Header />

            {loadingStatus === 'loading' && <Spinner />}
            {loadingStatus === 'error' && (
                <p>Произошла ошибка при получении информации о ресторане</p>
            )}

            {loadingStatus === 'idle' && (
                <div className='container'>
                    <div className='restaraunt__info'>
                        <h2>Основная информация о ресторане</h2>

                        {market && (
                            <div>
                                <p>
                                    <span>Название ресторана</span> -{' '}
                                    {market.name}
                                </p>
                                <p>
                                    <span>Цена доставки</span> -{' '}
                                    {market.priceDelivery} ₽
                                </p>
                                <p>
                                    <span>Время доставки</span> -{' '}
                                    {market.timeDelivery} мин.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className='filters'>
                        <h2>Фильтры товаров</h2>
                        {market && <FiltersList filters={market.filters} />}
                    </div>

                    <div>
                        <h2>Товары</h2>
                        <NewProduct />

                        {market && <ProductsList products={market.food} />}
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard

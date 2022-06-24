import React from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useDispatch, useSelector } from 'react-redux'
import { selectMarket } from '../../redux/market/selector'
import { updateFilter } from '../../redux/market/slice'

import style from './Filter.module.scss'

interface FilterProps {
    label: string
    token: string | null
}

const Filter: React.FC<FilterProps> = ({ label, token }) => {
    const dispatch = useDispatch()
    const { market } = useSelector(selectMarket)
    const { error, request } = useHttp()

    const deleteHandler = async (text: string) => {
        await request(
            `${process.env.REACT_APP_BACKEND_URL}/filter`,
            'DELETE',
            JSON.stringify({ filter: text }),
            {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            }
        )

        if (!error) {
            market &&
                dispatch(
                    updateFilter(
                        market.filters.filter(filter => filter !== text)
                    )
                )
        }
    }

    return (
        <div className={style.filter}>
            <p>{label}</p>
            <span onClick={() => deleteHandler(label)}>X</span>
        </div>
    )
}

export default Filter

import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilter } from '../../redux/market/slice'
import { selectMarket } from '../../redux/market/selector'

import Button from '../Button'

import './NewFilter.scss'

interface NewFilterProps {
    token: string | null
}

const NewFilter: React.FC<NewFilterProps> = ({ token }) => {
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const { register, handleSubmit, reset } = useForm()
    const { error, request } = useHttp()
    const { market } = useSelector(selectMarket)
    const dispatch = useDispatch()

    const changeAdded = () => setIsAdded(prevState => !prevState)

    const addNewFilter = async (data: any) => {
        await request(
            `${process.env.REACT_APP_BACKEND_URL}/filter`,
            'POST',
            JSON.stringify(data),
            {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        )

        if (!error) {
            changeAdded()
            reset()
            market && dispatch(updateFilter([...market.filters, data.filter]))
        }
    }

    return (
        <>
            {error && <p>{error}</p>}
            {isAdded ? (
                <form onSubmit={handleSubmit(addNewFilter)}>
                    <input
                        {...register('filter', {
                            required: 'Заполните это поле',
                        })}
                        type='text'
                        className='new-filter__input'
                        placeholder='Введите новый фильтр'
                    />
                    <Button className='new-filter__add'>V</Button>
                    <Button
                        onClick={changeAdded}
                        className='new-filter__cansel'
                    >
                        X
                    </Button>
                </form>
            ) : (
                <Button className='new-filter__plus' onClick={changeAdded}>
                    + Добавить новый фильтр
                </Button>
            )}
        </>
    )
}

export default NewFilter

import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/auth/selector'
import { selectMarket } from '../../redux/market/selector'

import Button from '../Button'
import Spinner from '../Spinner'

import './NewProduct.scss'

interface FormInputs {
    title?: string
    image?: string
    description?: string
    calories?: string
    gramm?: string
    price?: number
    filter?: string
}

const NewProduct: React.FC = () => {
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | null>(null)
    const { loading, error, request } = useHttp()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()
    const { token } = useSelector(selectAuth)
    const { market } = useSelector(selectMarket)

    const onSubmitHandler: SubmitHandler<FormInputs> = async data => {
        console.log(data)

        await request(
            `${process.env.REACT_APP_BACKEND_URL}/food`,
            'POST',
            JSON.stringify(data),
            {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        )

        if (!error) {
            reset()
            setSuccess('Товар успешно добавлен в ресторан!')

            setTimeout(() => {
                setSuccess(null)
            }, 3000)
        }
    }

    return (
        <div className='new-product'>
            {!isOpenForm && (
                <Button
                    className='new-product__button'
                    onClick={() => setIsOpenForm(true)}
                >
                    + Добавить новый товар
                </Button>
            )}
            {isOpenForm && (
                <>
                    {success && (
                        <p className='new-product__success'>{success}</p>
                    )}
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className='new-product__form__inputs'>
                            <label htmlFor='title'>Заголовок</label>
                            <input
                                {...register('title', {
                                    required: 'Заполните это поле',
                                })}
                                type='text'
                                id='title'
                                placeholder='Заголовок'
                            />
                            {errors.title?.message && (
                                <p className='new-product__error'>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className='new-product__form__inputs'>
                            <label htmlFor='description'>Описание</label>
                            <input
                                {...register('description', {
                                    required: 'Заполните это поле',
                                })}
                                type='text'
                                id='description'
                                placeholder='Описание товара'
                            />
                            {errors.description?.message && (
                                <p className='new-product__error'>
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className='new-product__form__inputs'>
                            <label>Изображение</label>
                            <input
                                {...register('image', {
                                    required: 'Заполните это поле',
                                })}
                                type='text'
                                id='image'
                                placeholder='Вставьте ссылку на изображение'
                            />
                            {errors.image?.message && (
                                <p className='new-product__error'>
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        <div className='new-product__form__inputs'>
                            <label htmlFor='filter'>Фильтр</label>
                            <select
                                {...register('filter', {
                                    required: 'Выберите фильтр',
                                })}
                                id='filter'
                            >
                                {market?.filters.map((filter, i) => {
                                    if (i !== 0)
                                        return (
                                            <option
                                                value={filter}
                                                key={i}
                                                className='new-product__option'
                                            >
                                                {filter}
                                            </option>
                                        )
                                })}
                            </select>
                            {errors.filter?.message && (
                                <p className='error'>{errors.filter.message}</p>
                            )}
                        </div>

                        <div className='new-product__form__info'>
                            <div className='new-product__form__inputs'>
                                <label htmlFor='calories'>Калории</label>
                                <input
                                    {...register('calories', {
                                        required: 'Заполните это поле',
                                    })}
                                    type='text'
                                    id='calories'
                                    placeholder='Калории'
                                />
                                {errors.calories?.message && (
                                    <p className='new-product__error'>
                                        {errors.calories.message}
                                    </p>
                                )}
                            </div>
                            <div className='new-product__form__inputs'>
                                <label htmlFor='gramm'>Граммы</label>
                                <input
                                    {...register('gramm', {
                                        required: 'Заполните это поле',
                                    })}
                                    type='text'
                                    id='gramm'
                                    placeholder='Граммы'
                                />
                                {errors.gramm?.message && (
                                    <p className='new-product__error'>
                                        {errors.gramm.message}
                                    </p>
                                )}
                            </div>
                            <div className='new-product__form__inputs'>
                                <label htmlFor='price'>Цена</label>
                                <input
                                    {...register('price', {
                                        required: 'Заполните это поле',
                                    })}
                                    type='text'
                                    id='price'
                                    placeholder='Цена'
                                />
                                {errors.price?.message && (
                                    <p className='new-product__error'>
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button className='new-product__button_add'>
                            Добавить товар
                        </Button>
                        <Button onClick={() => setIsOpenForm(false)}>
                            Отмена
                        </Button>
                    </form>
                    {loading && <Spinner />}
                </>
            )}
        </div>
    )
}

export default NewProduct

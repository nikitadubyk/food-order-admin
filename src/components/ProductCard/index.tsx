import React, { useState } from 'react'
import { ProductCardType, ProductFormProps, SubmitForm } from './types'
import { useSelector, useDispatch } from 'react-redux'
import { updateFood } from '../../redux/market/slice'
import { selectAuth } from '../../redux/auth/selector'
import { selectMarket } from '../../redux/market/selector'
import { useHttp } from '../../hooks/http.hook'
import { useForm, SubmitHandler } from 'react-hook-form'

import Button from '../Button'
import Spinner from '../Spinner'

import style from './ProductCard.module.scss'

const ProductCard: React.FC<ProductCardType> = props => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const { error, request } = useHttp()
    const { token } = useSelector(selectAuth)
    const { market } = useSelector(selectMarket)

    const dispatch = useDispatch()

    const deleteHandler = async (id: string) => {
        await request(
            `${process.env.REACT_APP_BACKEND_URL}/food/${id}`,
            'DELETE',
            null,
            {
                Authorization: 'Bearer ' + token,
            }
        )

        !error &&
            dispatch(updateFood(market?.food.filter(food => food.id !== id)))
    }

    const changeEditing = () => setIsEditing(prevState => !prevState)

    return (
        <div className={style.food__card}>
            <img src={props.image} alt={props.title} />
            {isEditing ? (
                <ProductForm
                    {...props}
                    price={props.price.toString()}
                    token={token}
                    market={market}
                    changeEditing={changeEditing}
                />
            ) : (
                <div>
                    <h4>{props.title}</h4>
                    <div className={style.food__card__info}>
                        <p className={style.food__card__gramm}>
                            {props.gramm ? props.gramm : 0} грамм
                        </p>
                        <p className={style.food__card__calories}>
                            {props.calories ? props.calories : 0} ккал
                        </p>
                    </div>

                    <p className={style.food__card__descr}>
                        {props.description}
                    </p>

                    <div className={style.food__card__order}>
                        <p className={style.food__card__price}>
                            {props.price} ₽
                        </p>

                        <Button onClick={changeEditing}>
                            <svg
                                enableBackground='new 0 0 64 64'
                                width='20px'
                                height='20px'
                                version='1.1'
                                viewBox='0 0 64 64'
                                xmlSpace='preserve'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                                <g>
                                    <path d='M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z' />
                                    <polygon points='21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  ' />
                                    <polygon points='20.273,37.028 18.642,46.28 27.913,44.654  ' />
                                    <path d='M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z' />
                                </g>
                            </svg>
                        </Button>
                        <Button onClick={() => deleteHandler(props.id)}>
                            <svg
                                height='20px'
                                width='20px'
                                version='1.1'
                                viewBox='0 0 512 512'
                                xmlSpace='preserve'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                                <g>
                                    <path d='M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31   h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13   c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z' />
                                    <path d='M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8   l18.7-242.6C396.8,178.1,396,176,379.4,176z' />
                                </g>
                            </svg>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

const ProductForm: React.FC<ProductFormProps> = ({
    id,
    title,
    description,
    gramm,
    price,
    calories,
    changeEditing,
    token,
    market,
}) => {
    const { register, handleSubmit, reset } = useForm()
    const [inputValues, setInputValues] = useState({
        title,
        description,
        price,
    })
    const { loading, error, request } = useHttp()
    const dispatch = useDispatch()

    const updateCorrectFood = () => {
        const newArray = market?.food.map(food => {
            if (food.id === id) {
                return {
                    ...food,
                    id,
                    title: inputValues.title,
                    description: inputValues.description,
                    price: +inputValues.price,
                }
            } else return food
        })

        dispatch(updateFood(newArray))
    }

    const patchProduct = async (data: SubmitForm) => {
        await request(
            `${process.env.REACT_APP_BACKEND_URL}/food/${id}`,
            'PATCH',
            JSON.stringify(data),
            {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        )

        if (!error) {
            changeEditing()
            reset()
            updateCorrectFood()
        }
    }

    const inputHandler = (e: any, name: string) => {
        setInputValues(prevState => {
            return {
                ...prevState,
                [name]: e.target.value,
            }
        })
    }

    const onSubmitHandler: SubmitHandler<SubmitForm> = data =>
        patchProduct(data)

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input
                {...register('title')}
                type='text'
                value={inputValues.title}
                className={style.form__title}
                onInput={(e: any) => inputHandler(e, 'title')}
            />
            <div className={style.food__card__info}>
                <p className={style.food__card__gramm}>
                    {gramm ? gramm : 0} грамм
                </p>
                <p className={style.food__card__calories}>
                    {calories ? calories : 0} ккал
                </p>
            </div>

            <textarea
                {...register('description')}
                className={style.form__descr}
                value={inputValues.description}
                onInput={(e: any) => inputHandler(e, 'description')}
            />
            <div className={style.food__card__order}>
                <input
                    {...register('price')}
                    className={style.form__price}
                    value={inputValues.price}
                    type='number'
                    onInput={(e: any) => inputHandler(e, 'price')}
                />

                <p>₽</p>

                <Button>V</Button>

                <Button onClick={changeEditing}>X</Button>
            </div>
            {loading && <Spinner width={20} height={20} />}
            {error && <p>Произошла ошибка, попробуйте еще</p>}
        </form>
    )
}

export default ProductCard

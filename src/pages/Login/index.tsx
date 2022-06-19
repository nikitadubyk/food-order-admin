import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHttp } from '../../hooks/http.hook'

import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/slice'

import Button from '../../components/Button'

import './Login.scss'
import Spinner from '../../components/Spinner'

interface FormInputs {
    email?: string
    password?: string
}

const Login: React.FC = () => {
    const { error, loading, request } = useHttp()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmitHandler: SubmitHandler<FormInputs> = async data => {
        const res = await request(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            'POST',
            JSON.stringify(data)
        )

        if (res.marketId && res.token) {
            dispatch(login(res))
            navigate('/dashboard')
        }
    }

    return (
        <div className='container'>
            <div className='login'>
                <h2>Авторизация</h2>

                {error && <p className='error'>{error}</p>}

                <form className='form' onSubmit={handleSubmit(onSubmitHandler)}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            {...register('email', {
                                required: 'Заполните это поле',
                            })}
                            type='email'
                            id='email'
                            placeholder='Ваш email'
                        />
                        {errors.email?.message && <p>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='password'>Пароль</label>
                        <input
                            {...register('password', {
                                required: 'Заполните это поле',
                                minLength: {
                                    value: 4,
                                    message: 'Минимум 4 символа',
                                },
                            })}
                            type='password'
                            id='password'
                            placeholder='Ваш пароль'
                        />
                        {errors.password?.message && (
                            <p>{errors.password.message}</p>
                        )}
                    </div>

                    <Button>Войти</Button>
                </form>
                {loading && <Spinner width={50} height={50} />}
            </div>
        </div>
    )
}

export default Login

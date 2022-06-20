import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/slice'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'

import './Header.scss'

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const exit = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='header'>
            <Link to='/dashboard' className='header__title'>
                Панель администратора
            </Link>

            <nav className='header__nav'>
                <ul>
                    <li>
                        <NavLink to='/'>Товары</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Link</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Link</NavLink>
                    </li>
                    <li>
                        <Button onClick={exit}>Выйти</Button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header

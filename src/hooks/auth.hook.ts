import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth } from '../redux/auth/selector'
import { login } from '../redux/auth/slice'

export const useAuth = () => {
    const { token } = useSelector(selectAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        //@ts-ignore
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (storedData && storedData.token) {
            dispatch(
                login({
                    token: storedData.token,
                    marketId: storedData.marketId,
                })
            )
        }
    }, [])

    return { token }
}

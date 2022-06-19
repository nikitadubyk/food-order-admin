import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    token: string | null
    marketId: string | null
}

const initialState: InitialState = {
    token: null,
    marketId: null,
}

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.marketId = action.payload.marketId

            localStorage.setItem(
                'userData',
                JSON.stringify({
                    token: state.token,
                    marketId: state.marketId,
                })
            )
        },
        logout: state => {
            state.token = null
            state.marketId = null
            localStorage.removeItem('userData')
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

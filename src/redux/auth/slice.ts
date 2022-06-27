import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    token: string | null
    marketId: string | null
    expiration: number | null
}

const initialState: InitialState = {
    token: null,
    marketId: null,
    expiration: null,
}

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.marketId = action.payload.marketId
            state.expiration = action.payload.expiration

            localStorage.setItem(
                'adminData',
                JSON.stringify({
                    token: state.token,
                    marketId: state.marketId,
                    expiration: state.expiration,
                })
            )
        },
        logout: state => {
            state.token = null
            state.marketId = null
            state.expiration = null
            localStorage.removeItem('adminData')
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

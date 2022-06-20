import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Market } from './types'

export const fetchMarketInfo = createAsyncThunk(
    '/admin/market',
    async (token: string | null) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/market`, {
            headers: { Authorization: 'Bearer ' + token },
        })
        return await res.json()
    }
)

interface InitialState {
    market: Market | null
    loadingStatus: 'idle' | 'loading' | 'error'
}

const initialState: InitialState = {
    market: null,
    loadingStatus: 'idle',
}

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMarketInfo.pending, state => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchMarketInfo.fulfilled, (state, action) => {
                state.loadingStatus = 'idle'
                state.market = action.payload
            })
            .addCase(fetchMarketInfo.rejected, state => {
                state.loadingStatus = 'error'
            })
    },
})

// export const {} = marketSlice.actions
export default marketSlice.reducer

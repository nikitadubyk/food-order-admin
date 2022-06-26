import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth/slice'
import marketSlice from './market/slice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        market: marketSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

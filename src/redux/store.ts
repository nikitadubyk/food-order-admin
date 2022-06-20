import { configureStore } from '@reduxjs/toolkit'

import adminSlice from './admin/slice'
import authSlice from './auth/slice'
import marketSlice from './market/slice'

export const store = configureStore({
    reducer: {
        admin: adminSlice,
        auth: authSlice,
        market: marketSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

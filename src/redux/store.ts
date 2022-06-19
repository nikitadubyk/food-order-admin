import { configureStore } from '@reduxjs/toolkit'

import adminSlice from './admin/slice'
import authSlice from './auth/slice'

export const store = configureStore({
    reducer: {
        admin: adminSlice,
        auth: authSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

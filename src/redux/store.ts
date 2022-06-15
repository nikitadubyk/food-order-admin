import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './admin/slice'

export const store = configureStore({
    reducer: {
        admin: adminSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

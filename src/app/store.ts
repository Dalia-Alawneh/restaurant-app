import { configureStore } from '@reduxjs/toolkit'
import toggleSideBarReducer from '../features/sideBar/sideBarSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
export const store = configureStore({
    reducer: {
        toggleSideBar: toggleSideBarReducer, 
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


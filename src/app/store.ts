import { configureStore } from '@reduxjs/toolkit'
import toggleSideBarReducer from '../features/sideBar/sideBarSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import tempOrdersReducer from '../features/tempOrder/TempOrder'
export const store = configureStore({
    reducer: {
        toggleSideBar: toggleSideBarReducer, 
        tempOrders: tempOrdersReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


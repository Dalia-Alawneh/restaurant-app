import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder } from '../../interfaces'

export interface ITempOrder {
    orders:IOrder[]
}

const initialState: ITempOrder = {
    orders:[]
}

export const tempOrdersSlice = createSlice({
    name: 'tempOrders',
    initialState,
    reducers: {
        addToTempOrders: (state, action:PayloadAction<IOrder>) => {
            state.orders = [...state.orders, {...action.payload}]
        },
    },
})

export const { addToTempOrders } = tempOrdersSlice.actions

export default tempOrdersSlice.reducer
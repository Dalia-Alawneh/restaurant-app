import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder } from '../../interfaces'

export interface ITempOrder {
    orders: IOrder[];
    totalPrice: number;
}

const initialState: ITempOrder = {
    orders: [],
    totalPrice: 0,
}

export const tempOrdersSlice = createSlice({
    name: 'tempOrders',
    initialState,
    reducers: {
        addToTempOrders: (state, action: PayloadAction<IOrder>) => {
            state.orders = [...state.orders, { ...action.payload }]
        },
        removeFromTempOrders: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload
            const updatedOrders = state.orders.filter(order => order.id !== productIdToRemove);

            state.orders = updatedOrders;
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            const productIndex = state.orders.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                const updatedOrders = [...state.orders];
                updatedOrders[productIndex] = {
                    ...updatedOrders[productIndex],
                    qty: (updatedOrders[productIndex].qty || 0) + 1,
                };

                state.orders = updatedOrders;
            }
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            const productIndex = state.orders.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                const updatedOrders = [...state.orders];
                const currentQuantity = updatedOrders[productIndex].qty || 0;

                const newQuantity = Math.max(0, currentQuantity - 1);

                updatedOrders[productIndex] = {
                    ...updatedOrders[productIndex],
                    qty: newQuantity,
                };

                state.orders = updatedOrders;
            }
        },
        calculateTotalPrice: (state) => {
            const totalPrice = state.orders.reduce((acc, order) => {
                const quantity = order.qty || 0;
                const price = order.price || 0;

                console.log("Calculating for item:", order);
                console.log("Quantity:", quantity);
                console.log("Price:", price);

                return acc + quantity * price;
            }, 0);

            console.log("Total Price:", totalPrice);

            state.totalPrice = totalPrice;
        },
        cancelOrder : (state)=>{
            state.orders = []
            state.totalPrice = 0
        }


    },
})

export const { addToTempOrders, incrementQuantity,
    decrementQuantity, removeFromTempOrders,
    calculateTotalPrice, cancelOrder } = tempOrdersSlice.actions

export default tempOrdersSlice.reducer
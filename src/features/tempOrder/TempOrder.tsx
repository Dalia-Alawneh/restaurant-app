import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder, IProduct } from '../../interfaces'

export interface ITempOrder {
    order: IOrder;
    totalPrice: number;
}

const initialState: ITempOrder = {
    order: {date:'', products:[], id:0},
    totalPrice: 0,
}

export const tempOrdersSlice = createSlice({
    name: 'tempOrders',
    initialState,
    reducers: {
        addToTempOrders: (state, action: PayloadAction<IProduct>) => {
            state.order.products = [...state.order.products, { ...action.payload, qty:1 }]
        },
        removeFromTempOrders: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload
            const updatedOrder = state.order.products.filter(product => product.id !== productIdToRemove);

            state.order.products = updatedOrder;
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            const productIndex = state.order.products.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                const updatedOrder = [...state.order.products];
                updatedOrder[productIndex] = {
                    ...updatedOrder[productIndex],
                    qty: (updatedOrder[productIndex].qty || 0) + 1,
                };

                state.order.products = updatedOrder;
            }
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            const productIndex = state.order.products.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                const updatedOrder = [...state.order.products];
                const currentQuantity = updatedOrder[productIndex].qty || 0;

                const newQuantity = Math.max(0, currentQuantity - 1);

                updatedOrder[productIndex] = {
                    ...updatedOrder[productIndex],
                    qty: newQuantity,
                };

                state.order.products = updatedOrder;
            }
        },
        calculateTotalPrice: (state) => {
            const totalPrice = state.order.products.reduce((acc, order) => {
                const quantity = order.qty || 0;
                const price = order.attributes.price || 0;

                console.log("Calculating for item:", order);
                console.log("Quantity:", quantity);
                console.log("Price:", price);

                return acc + quantity * price;
            }, 0);

            console.log("Total Price:", totalPrice);

            state.totalPrice = totalPrice;
        },
        resetOrder : (state)=>{
            state.order.products = []
            state.totalPrice = 0
        },
        updateId: (state, action: PayloadAction<number>)=>{
            state.order.id = action.payload
        }

        


    },
})

export const { addToTempOrders, incrementQuantity,
    decrementQuantity, removeFromTempOrders,
    calculateTotalPrice, resetOrder, updateId } = tempOrdersSlice.actions

export default tempOrdersSlice.reducer
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct, ITempOrder } from '../../interfaces'
import toast from 'react-hot-toast';

export interface IStoreTempOrder {
    order: ITempOrder;
    totalPrice: number;
}

const initialState: IStoreTempOrder = {
    order: { date: '', products: [], id: 0 },
    totalPrice: 0,
}

export const tempOrdersSlice = createSlice({
    name: 'tempOrders',
    initialState,
    reducers: {
        addToTempOrders: (state, action: PayloadAction<IProduct>) => {
            state.order.products = [...state.order.products, { ...action.payload, qty: 1 }]
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
                const product = state.order.products[productIndex];
                const productStock = product.attributes.stock; // Optional chaining to access stock

                if (product?.qty !== undefined && productStock !== undefined) { // Null check for qty and stock
                    if (product.qty < productStock) {
                        const updatedOrder = [...state.order.products];
                        updatedOrder[productIndex] = {
                            ...product,
                            qty: (product.qty || 0) + 1,
                        };

                        state.order.products = updatedOrder;
                    } else {
                        toast.error("Out of stock!😵‍💫, check back later🫥");
                    }
                } else {
                    console.log("Quantity or stock information is undefined.");
                }
            }
        },


        decrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            const productIndex = state.order.products.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                const updatedOrder = [...state.order.products];
                const currentQuantity = updatedOrder[productIndex].qty || 0;

                const newQuantity = Math.max(1, currentQuantity - 1);

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
        resetOrder: (state) => {
            state.order.products = []
            state.totalPrice = 0
        },
        updateId: (state, action: PayloadAction<number>) => {
            state.order.id = action.payload
        },
        removeOrderItemById: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload;

            // Filter out the product with the specified ID
            state.order.products = state.order.products.filter(product => product.id !== productIdToRemove);
        },




    },
})

export const { addToTempOrders, incrementQuantity,
    decrementQuantity, removeFromTempOrders,
    calculateTotalPrice, resetOrder, updateId, removeOrderItemById } = tempOrdersSlice.actions

export default tempOrdersSlice.reducer
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces';

interface CartState {
  items: IProduct[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const { id } = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.id === id);
      if (existingProductIndex !== -1) {
        if (state.items[existingProductIndex].qty !== undefined) {
          state.items[existingProductIndex].qty!++;
        } else {
          state.items[existingProductIndex].qty = 1;
        }
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number|string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
    
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        const currentStock = item.attributes.stock || 0;
        const newQuantity = Math.max(1, Math.min(quantity, currentStock));
    
        state.items[itemIndex] = { ...item, qty: newQuantity };
        state.totalPrice = calculateTotalPrice(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

const calculateTotalPrice = (items: IProduct[]): number => {
  return items.reduce((total, item) => {
    const quantity = item.qty || 0;
    const price = item.attributes.price || 0;
    return total + quantity * price;
  }, 0);
};

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

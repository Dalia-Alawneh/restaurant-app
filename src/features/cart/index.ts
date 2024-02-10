import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { IProduct } from '../../interfaces';

interface CartState {
  items: IProduct[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const STORAGE_KEY = 'cartItems';

const loadStateFromLocalStorage = (): CartState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    toast.error('Something goes wrong.!🥲')
    return initialState;
  }
};

const saveStateToLocalStorage = (state: CartState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    toast.error('Something goes wrong.!🥲')

  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadStateFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const { id } = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      if (existingProduct) {
        existingProduct.qty = (existingProduct.qty || 0) + 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveStateToLocalStorage(state);
      toast.success('Item Added Successfully !');
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
      saveStateToLocalStorage(state);
      toast.success('Item Removed Successfully !');
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        const currentStock = item.attributes.stock || 0;
        const newQuantity = Math.max(1, Math.min(quantity, currentStock));
        if (newQuantity === currentStock) {
          toast.error("Out of stock! 😵‍💫 Check back later 🫥");
          return;
        }
        item.qty = newQuantity;
        state.totalPrice = calculateTotalPrice(state.items);
        saveStateToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      saveStateToLocalStorage(state);
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

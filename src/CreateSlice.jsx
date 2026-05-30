import { createSlice } from '@reduxjs/toolkit';

export const CreatSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => (i.id && i.id === item.id) || i.name === item.name);
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
        }
      } else {
        state.items.push({ ...item });
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter((i) => (i.id && i.id !== item.id) || i.name !== item.name);
    },
    updateQuantity: (state, action) => {
      const { name, id, quantity } = action.payload;
      const item = state.items.find((i) => (i.id && i.id === id) || i.name === name);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => (i.id && i.id !== id) || i.name !== name);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CreatSlice.actions;

export default CreatSlice.reducer;

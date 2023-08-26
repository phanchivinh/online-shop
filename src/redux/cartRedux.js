import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    totalQuantity: 0, //how many total items in cart
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.totalQuantity += action.payload.quantity;
      state.products.push({ ...action.payload.product, product_image: action.payload.image })
      state.totalPrice += (action.payload.price * action.payload.quantity)
    },
    removeProduct: (state, action) => {
    }

  }
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;

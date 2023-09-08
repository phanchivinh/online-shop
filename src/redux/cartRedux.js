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
      const foundProduct = state.products.find(item => item.variant_product_id === action.payload.product.variant_product_id)
      if (foundProduct) {
        foundProduct.product_amount += action.payload.quantity
        foundProduct.product_total_price += action.payload.price * action.payload.quantity
      } else {
        state.products.push({ ...action.payload.product, product_image: action.payload.image, product_amount: action.payload.quantity, product_total_price: (action.payload.price * action.payload.quantity) })
      }
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += (action.payload.price * action.payload.quantity)

      // localStorage.setItem('products', JSON.stringify(state.products));
      // localStorage.setItem('totalQuantity', state.totalQuantity);
      // localStorage.setItem('products', state.totalPrice);
    },
    removeProduct: (state, action) => {
      const price = action.payload.product_price
      const quantity = action.payload.product_amount
      const existingProduct = state.products.find(item => item.variant_product_id === action.payload.variant_product_id)

      if (existingProduct) {
        if (existingProduct.product_amount > quantity) {
          existingProduct.quantity -= quantity
        } else {
          state.products = state.products.filter(product => product.variant_product_id !== action.payload.variant_product_id)
        }
      }
      state.totalQuantity -= quantity;
      state.totalPrice -= price * quantity
    },
    clearCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  }
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

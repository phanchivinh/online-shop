import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react'
import { products } from '../assets/image'
import { AiOutlineDelete, AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from './EmptyCart'
import { publicRequest } from '../requestMethod'
import { removeProduct } from '../redux/cartRedux'

const Cart = (props, cartRef) => {
  const cart = useSelector(state => state.cart)
  const [openCart, setOpenCart] = useState(false)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch()

  useImperativeHandle(cartRef, () => ({
    setOpenCart
  }))

  const handleRemove = async (product) => {
    dispatch(removeProduct(product))
    if (isAuthenticated) {
      const response = await publicRequest.post('v1/carts/add-product', {
        variant_product_id: product.variant_product_id,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => res.data)
    }
  }

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const response = await publicRequest.get('/v1/carts/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data)
        debugger
      } catch (error) {
        console.log(error)
      }
    }

    if (isAuthenticated) {
      getUserCart()
    }
  }, [])

  return (
    <div className={`w-screen min-[425px]:w-96 p-5 fixed top-0 h-screen bg-white shadow-xl overflow-y-scroll z-50 duration-300 ease-linear ${openCart ? 'right-0' : 'right-[-110%]'}`}>
      <AiOutlineArrowRight className='text-xl cursor-pointer' onClick={() => setOpenCart(false)} />
      <h1 className='text-blue-300 my-4 text-2xl font-bold'>Giỏ hàng của bạn</h1>
      {
        cart.products.length === 0 ? <EmptyCart /> : (cart.products.map((item) => (
          <div className='flex items-center gap-4 mb-4' key={`cart-${item.product_id}`}>
            <img className='w-20 h-24 object-cover pointer-events-none' src={item.product_image} alt='item' />
            {/* detail */}
            <div>
              <h2 className='text-sm text-blue-300 mb-2'>{item.product_name}</h2>
              <p className='text-xs mb-2'><b>Size: </b>{item.size_description?.substring(0, 20)}</p>
              <p className='text-xs mb-2'><b>Màu: </b>{item.color_name?.substring(0, 20)}</p>
              <div className='text-sm flex justify-between'>
                <span>{cart.totalQuantity}</span>
                <span className='font-bold'> x {item.product_price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}</span>
              </div>
            </div>
            <button onClick={() => handleRemove(item)}><AiOutlineDelete className='text-4xl text-red-600 cursor-pointer' /></button>
          </div>
        )))
      }
      {/* Total */}
      <div className='flex justify-between mb-4'>
        <span className='font-semibold'>Tổng cộng:</span>
        <span className='font-bold'>{cart.totalPrice.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
          useGrouping: true,
        })}</span>
      </div>
      <Link onClick={() => setOpenCart(false)} to="/cart"><button className='flex gap-4 items-center justify-center p-3 text-white font-bold w-full bg-blue-500 cursor-pointer'>Đặt hàng</button></Link>
    </div>
  )
}

export default forwardRef(Cart)

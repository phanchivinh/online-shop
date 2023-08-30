import { useState } from 'react'
import { images, products } from '../assets/image'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [stripeToken, setStripeToken] = useState(null)
  const KEY = process.env.REACT_APP_STRIPE
  const onToken = (token) => {
    setStripeToken(token)
  }

  console.log(stripeToken)
  const data = [
    {
      id: 1,
      img: "https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg",
      img2: products[1],
      title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY',
      desc: 'Đây là mô tả được viết tạm thời của item :BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY',
      price: 800000,
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg",
      img2: products[3],
      title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - HOME',
      desc: 'Đây là mô tả được viết tạm thời của item :BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - HOME',
      price: 530000,
    },
  ]
  return (
    <div className='p-7'>
      {/* Title */}
      <h1 className='text-4xl text-center font-light'>Giỏ hàng của bạn</h1>

      {/* Top */}
      <div className='flex items-center justify-between p-5'>
        <button className='p-2 font-semibold cursor-pointer border border-black'>Tiếp tục mua sắm</button>
        <div>
          <span className='underline underline-offset-4 cursor-pointer'>Giỏ hàng (2)</span>
        </div>
        <button className='p-3 font-semibold cursor-pointer border border-black bg-blue-400 text-white'>Thanh toán ngay</button>
      </div>

      {/* Bottom */}
      <div className='flex justify-between  border-t-2 border-blue-100'>

        {/* info */}
        <div className='flex-[3]'>
          {cart.products?.map(item => (
            <div key={`cart-${item.product_id}`} className='mt-5 flex justify-between pb-4 border-b border-black/50'>
              {/* Product details */}
              <div className='flex-[2] flex '>
                <img src={item.product_image} alt={`${item.product_id}`} className='w-52 h-auto' />
                {/* Details */}
                <div className='p-5 flex flex-col justify-around'>
                  <span><b>Tên sản phẩm: </b>{item.product_name}</span>
                  <span><b>CHI TIẾT: </b>{item.product_description}</span>
                  <div><b>Color: </b> {item.color_name}</div>
                  <span><b>Size: </b>{item.size_name}</span>
                </div>
              </div>
              {/* Price detail */}
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div>
                  {/* Product amount */}
                  <div className='flex items-center text-lg mb-5'>
                    <button className='bg-gray-200 w-10 border border-black rounded-lg hover:bg-blue-50'>-</button>
                    <span className='m-3 text-2xl'>1</span>
                    <button className='bg-gray-200 w-10 border border-black rounded-lg hover:bg-blue-50'>+</button>
                  </div>
                  {/* Product price */}
                  <span className='text-xl text-red-600 font-bold'>Giá: {item.product_price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className='flex-1 border border-black/50 rounded-xl p-5 mt-2 ml-1 h-[60vh]'>
          {/* Title */}
          <h1 className='text-3xl text-center '>THANH TOÁN</h1>
          {/* Summary item */}
          <div className='my-7 flex justify-between'>
            <span>Subtotal: </span>
            <span>1.330.000</span>
          </div>
          {/* Summary item */}
          <div className='my-7 flex justify-between'>
            <span>Tiền ship: </span>
            <span>30.000</span>
          </div>
          {/* Summary item */}
          <div className='my-7 flex justify-between'>
            <span>Giảm giá: </span>
            <span>-20.000</span>
          </div>
          {/* Summary item */}
          <div className='my-7 flex justify-between text-lg font-bold'>
            <span>Tổng cộng: </span>
            <span>1.340.000</span>
          </div>
          <StripeCheckout
            name='V&T Shop'
            image='https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg'
            billingAddress
            shippingAddress
            description={`Tổng hóa đơn của bạn là ${cart.totalPrice}`}
            amount={cart.totalPrice}
            token={onToken}
            stripeKey={KEY}
          >
            <button className='w-full bg-blue-300 p-2 rounded-lg text-white hover:bg-blue-400'>Thanh toán ngay</button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  )
}

export default Cart

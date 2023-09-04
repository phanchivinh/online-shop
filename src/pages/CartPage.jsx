import { useEffect, useState } from 'react'
import { images, products } from '../assets/image'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { publicRequest } from '../requestMethod'
import EmptyCart from '../components/EmptyCart'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [user, setUser] = useState({})
  const cart = useSelector(state => state.cart)
  const accessToken = useSelector(state => state.auth.accessToken)
  const navigate = useNavigate()

  const handleSubmit = () => {
    //Clear cart here
    navigate("/cart/success")
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await publicRequest.get('/v1/users/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data)
        debugger
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    // getUser()
  }, [])

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
        <div></div>
      </div>

      {/* Bottom */}
      <div className='flex justify-between  border-t-2 border-blue-100'>

        {/* Summary */}
        <div className='flex-1 border border-black/50 rounded-xl p-5 mt-2 ml-1'>
          {/* Title */}
          <h1 className='text-3xl text-center '>Thông tin giao hàng</h1>
          {/* Summary item */}
          <div className='my-7 flex'>
            <label className='mb-2 mr-4 font-bold'>Tên:</label>
            <span>{`${user.user_last_name} ${user.user_first_name}`}</span>
          </div>
          {/* Summary item */}
          <div className='my-7 flex'>
            <label className='mb-2 mr-4 font-bold'>Địa chỉ Email:</label>
            <span>{user.user_email}</span>
          </div>
          <div className='my-7 flex'>
            <label className='mb-2 mr-4 font-bold'>Số điện thoại liên hệ:</label>
            <span>{user.user_phone_number}</span>
          </div>
          <div className='my-7 flex'>
            <label className='mb-2 mr-4 font-bold'>Địa chỉ nhận hàng:</label>
            <span>{user.user_address}</span>
          </div>
          <div className='my-7 p-1 flex flex-col border border-black rounded-md'>
            <label className='mb-2 mr-4 font-bold'>Chọn phương thức thanh toán:</label>
            <div className='ml-4'>
              <input type='radio' name='payment' value="cod" id='cod-type' />
              <label htmlFor='cod-type'>Thanh toán khi nhận hàng (COD)</label>
            </div>
            <div className='ml-4'>
              <input type='radio' name='payment' value='card' id='card-type' />
              <label htmlFor='card-type'>Thanh toán bằng thẻ</label>
            </div>
          </div>
          <button onClick={handleSubmit} className='w-full bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-400'>Thanh toán ngay</button>
        </div>


        {/* ------------------------------------------Product Cart------------------------------------------ */}
        <div className='flex-1 ml-2'>
          {
            cart.products.length === 0 && <EmptyCart />
          }
          {cart.products?.map(item => (
            <div key={`cart-${item.product_id}`} className='mt-5 h-36 flex justify-between pb-4 border-b border-black/50'>
              {/* Product details */}
              <div className='flex flex-[2]'>
                <img src={item.product_image} alt={`${item.product_id}`} className='flex-1 h-full' />
                {/* Details */}
                <div className='flex-[2] h-full p-5 flex flex-col justify-around text-sm'>
                  <span><b>Tên sản phẩm: </b>{item.product_name}</span>
                  {/* <span><b>CHI TIẾT: </b>{item.product_description.slice()</span> */}
                  <div><b>Màu: </b> {item.color_name}</div>
                  <span><b>Size: </b>{item.size_name}</span>
                </div>
              </div>
              {/* Price detail */}
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div>
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
          <div className='mt-4 py-2 pl-2 pr-4 border border-blue-400 rounded-md'>
            <div className='flex justify-between'>
              <span>Tạm tính</span>
              <span>{cart.totalPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}</span>
            </div>
            <div className='flex justify-between'>
              <span>Phí vận chuyển</span>
              <span>0đ</span>
            </div>
            <div className='border my-4'></div>
            <div className='flex justify-between'>
              <span>Tổng cộng</span>
              <span>{cart.totalPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}</span>
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default Cart

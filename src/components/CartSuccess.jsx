import React from 'react'
import { illustrationImg } from '../assets/image'
import { useNavigate } from 'react-router-dom'

const CartSuccess = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center mb-4 relative'>
      <button onClick={() => navigate("/")} className='bg-blue-500 text-white p-2 rounded-md text-xl'>Quay lại trang chủ</button>
      <div>
        <img alt='payment-successful' src={illustrationImg.paymentSuccess} />
      </div>
      <span className='absolute top-[50%] bg-green-500 text-white p-2 rounded-md text-xl'>Bạn đã đặt hàng thành công</span>
    </div>
  )
}

export default CartSuccess

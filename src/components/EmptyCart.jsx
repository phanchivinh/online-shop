import React from 'react'
import { illustrationImg } from '../assets/image'

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center mb-4'>
      <div>
        <img alt='empty-cart' src={illustrationImg.emptyCart} />
      </div>
      <span>Giỏ hàng của bạn chưa có sản phẩm nào</span>
    </div>
  )
}

export default EmptyCart

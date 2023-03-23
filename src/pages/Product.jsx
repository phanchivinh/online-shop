import React, { useState } from 'react'
import { products } from '../assets/image'
import { BsCartPlus } from 'react-icons/bs'

const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImg, setSelectedImg] = useState(0)

  return (
    <div className='flex py-5 px-12 gap-12'>
      {/* Left */}
      <div className='flex-1 flex gap-5'>
        {/* Item images */}
        <div className='flex-1'>
          <img className='w-full h-28 mb-1 object-cover cursor-pointer' src={products[0]} alt="" onClick={() => setSelectedImg(0)} />
          <img className='w-full h-28 mb-1 object-cover cursor-pointer' src={products[1]} alt="" onClick={() => setSelectedImg(1)} />
        </div>
        {/* Main image */}
        <div className='flex-[5]'>
          <img className='w-full max-h-[800px] object-cover' src={products[selectedImg]} alt="" />
        </div>
      </div>
      {/* Right */}
      <div className='flex-1 flex flex-col'>
        <h1 className='text-3xl font-bold'>BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY</h1>
        <div className='w-10 h-2 my-2 border-b-4 border-b-blue-300' />
        <span className='text-2xl'>800.000 đ</span>
        <p className='pt-10 pb-8 text-xl'>Describe: Áo thun cotton 100% cùng các sọc rộng với màu sắc thoải mái.</p>
        {/* Quantity */}
        <div className='flex gap-5 mb-4'>
          <h2 className='text-xl font-semibold'>Số lượng:</h2>
          <button className='border border-black px-3 font-bold hover:bg-blue-200' onClick={() => setQuantity(prev => prev === 1 ? 1 : prev-1)}>-</button>
          {quantity}
          <button className='border border-black px-3 font-bold hover:bg-blue-200' onClick={() => setQuantity(prev => prev+1)}>+</button>
        </div>
        {/* Size options */}
        <div className='flex gap-4 mb-10'>
          <h2 className='text-xl font-semibold'>Kích cỡ:</h2>
          <select className='border border-black rounded-md bg-blue-200 w-56'>
            <option>Chọn một tùy chọn</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>

        <button className='flex gap-4 items-center justify-center p-3 text-white font-bold w-full bg-blue-500 cursor-pointer'>
          <BsCartPlus /> THÊM VÀO GIỎ HÀNG
        </button>
      </div>
    </div>
  )
}

export default Product
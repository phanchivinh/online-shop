import React, { useState } from 'react'
import { products } from '../assets/image'
import { BsCartPlus } from 'react-icons/bs'

const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImg, setSelectedImg] = useState(0)

  return (
    <div className='flex flex-col sm:flex-row py-5 px-5 md:px-12 gap-5 md:gap-12'>
      {/* Left */}
      <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3 md:gap-5'>
        {/* Item images */}
        <div className='flex-1 flex flex-row sm:flex-col sm:overflow-y-scroll gap-1'>
          <img className={`w-auto sm:w-full h-28 mb-1 object-cover cursor-pointer border-black ${selectedImg === 0 ? 'border opacity-100' : 'opacity-60 border-none'}`} src="https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg" alt="" onClick={() => setSelectedImg(0)} />
        </div>
        {/* Main image */}
        <div className='flex-[5]'>
          <img className='w-full max-h-[800px] object-cover' src="https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg" alt="" />
        </div>
      </div>
      {/* Right */}
      <div className='flex-1 flex flex-col'>
        <h1 className='text-2xl md:text-3xl font-bold'>Áo sơ mi Oxford *Angel*</h1>
        <div className='w-10 h-2 my-2 border-b-4 border-b-blue-300' />
        <span className='text-xl md:text-2xl'>500.000 đ</span>
        <p className='pt-10 pb-8 text-lg md:text-xl'>Chi tiết: THÀNH PHẦN : 65% POLYESTER VÀ 35% COTTON, THIÊN THẦN THÊU, CÓ TÚI NHỎ Ở TRƯỚC NGỰC, FORM SLIMFIT</p>
        {/* Quantity */}
        <div className='flex gap-5 mb-4'>
          <h2 className='text-xl font-semibold'>Số lượng:</h2>
          <button className='border border-black px-3 font-bold hover:bg-blue-200' onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
          {quantity}
          <button className='border border-black px-3 font-bold hover:bg-blue-200' onClick={() => setQuantity(prev => prev + 1)}>+</button>
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

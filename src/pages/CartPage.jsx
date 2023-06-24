import React from 'react'
import { products } from '../assets/image'

const Cart = () => {

  const data = [
      {
          id:1,
          img:products[0],
          img2:products[1],
          title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY',
          desc: 'Đây là mô tả được viết tạm thời của item :BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY',
          price: 800000,
      },
      {
          id:2,
          img:products[2],
          img2:products[3],
          title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - HOME',
          desc: 'Đây là mô tả được viết tạm thời của item :BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - HOME',
          price: 800000,
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
        <div className='flex justify-between'>

          {/* info */}
          <div className='flex-[3]'>
            {data?.map(item => (
              <div key={`cart-${item.id}`} className='my-5 flex justify-between'>
                {/* Product details */}
                <div className='flex-[2] flex '> 
                    <img src={item.img} alt={`${item.id}`} className='w-52 h-auto' />
                    {/* Details */}
                    <div className='p-5 flex flex-col justify-around'>
                        <span><b>Tên sản phẩm: </b>{item.title}</span>
                        <span><b>ID:</b>{item.id}</span>
                        <div>Color:4gf245d</div>
                        <span>Size</span>
                    </div>
                </div>
                  {/* Price detail */}
                  <div className='flex-1'>
                    price
                  </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className='flex-1'>summary</div>
        </div>
    </div>
  )
}

export default Cart
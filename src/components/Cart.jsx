import React, { forwardRef, useState, useImperativeHandle } from 'react'
import { products } from '../assets/image'
import { AiOutlineDelete, AiOutlineArrowRight } from 'react-icons/ai'

const Cart = ( props, cartRef ) => {
  const [openCart, setOpenCart] = useState(false)

    useImperativeHandle(cartRef, () => ({
        setOpenCart
    }))

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
    <div className={`w-screen min-[425px]:w-96 p-5 fixed top-0 h-screen bg-white shadow-xl overflow-y-scroll z-50 duration-300 ease-linear ${openCart ? 'right-0' : 'right-[-110%]'}`}>
        <AiOutlineArrowRight className='text-xl cursor-pointer' onClick={() => setOpenCart(false)} />
        <h1 className='text-blue-300 my-4 text-2xl font-bold'>Giỏ hàng của bạn</h1>
        {data?.map((item) => (
            <div className='flex items-center gap-4 mb-4' key={`cart-${item.id}`}>
                <img className='w-20 h-24 object-cover pointer-events-none' src={item.img} alt='item' />
                {/* detail */}
                <div>
                    <h2 className='text-sm text-blue-300 mb-2'>{item.title}</h2>
                    <p className='text-xs mb-2'>{item.desc?.substring(0,100)}</p>
                    <div className='text-sm'>1 x {item.price}</div>
                </div>
                <AiOutlineDelete className='text-4xl text-red-600 cursor-pointer'/>
            </div>
        ))}
        {/* Total */}
        <div className='flex justify-between mb-4'>
            <span className='font-semibold'>Tổng cộng:</span>
            <span>1.000.000 đ</span>
        </div>
        <button className='flex gap-4 items-center justify-center p-3 text-white font-bold w-full bg-blue-500 cursor-pointer'>THANH TOÁN</button>
    </div>
  )
}

export default forwardRef(Cart)
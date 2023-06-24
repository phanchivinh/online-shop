import React from 'react'
import { products } from '../assets/image'
import Card from './Card'

const FeaturedProducts = () => {
    const data = [
        {
            id:1,
            img:products[0],
            img2:products[1],
            title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY',
            price: 800000,
        },
        {
            id:2,
            img:products[2],
            img2:products[3],
            title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - HOME',
            price: 800000,
        },
        {
            id:3,
            img:products[4],
            img2:products[5],
            title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - ĐỎ',
            price: 900000,
        },
        {
            id:4,
            img:products[6],
            img2:products[7],
            title: 'VÁY YẾM WORKWEAR - CANVAS XÁ',
            price: 500000,
        },
        {
            id:5,
            img:products[8],
            img2:products[9],
            title: 'ÁO KHOÁC NỮ *ANGLE*',
            price: 800000,
        },
        {
            id:6,
            img:products[10],
            img2:products[11],
            title: 'QUẦN DÀI NỮ *ANGLE*',
            price: 600000,
        },
        {
            id:7,
            img:products[12],
            img2:products[13],
            title: 'ÁO KHOÁC DÙ',
            price: 950000,
        },
        {
            id:8,
            img:products[14],
            img2:products[15],
            title: 'TÚI ĐỰNG GIÀY BÓNG ĐÁ - 5 MÀU',
            price: 500000,
        },
    ]

    return (
        <div className='mt-[-80px] sm:mt-[-100px] mb-10 mx-4 sm:m-10 2xl:mx-96'>
            <div className='flex justify-center items-center mb-12'>
                <h2 className='text-lg sm:text-2xl font-bold'>SẢN PHẨM NỔI BẬT</h2>
            </div>
            {/* product list */}
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-12'>
                {data.map((item) => (
                    <Card item={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedProducts
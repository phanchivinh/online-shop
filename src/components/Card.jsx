import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({item}) => {

  return (
    <Link to={`/product/${item.id}`} className='flex justify-center items-center mb-6'>
        <div  className='w-full min-[525px]:w-[200px] flex flex-col justify-center items-center'>
            {/* image */}
            <div className='mb-4 w-full h-[200px] min-[525px]:h-[280px] overflow-hidden relative group'>
                <img src={item.img} alt={`${item.title}`} className='w-full h-full object-cover absolute z-[1] '/>
                <img src={item.img2} alt={`${item.title}`} className='w-full h-full object-cover absolute opacity-0 z-[2] group-hover:opacity-100 transition-all duration-200 ease-linear '/>
            </div>
            <div className='font-bold text-xs min-[525px]:text-sm'>
                <h3 className='text-center'>{item.title}</h3>
                <h3 className='text-center'>{item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                        })}
                </h3>
            </div>
        </div>
    </Link>
  )
}

export default Card
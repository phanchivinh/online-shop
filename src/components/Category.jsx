import React from 'react'
import { Link } from 'react-router-dom'
import { categoryBanners } from '../assets/image'

const Category = () => {
  return (
    <div className='py-16 sm:px-14 2xl:px-96'>
        {/* Container */}
        <div className='font-playfairDisplay flex flex-col justify-center items-center md:flex-row gap-10 '>
            {/* Women category */}
            <div className='relative flex-1 before:absolute before:top-0 before:left-0 hover:before:bg-black/50 before:pointer-events-none before:z-[1] before:w-full before:h-full before:transition before:duration-300 '>
                <Link to='/products/women' className=''>
                    <img src={categoryBanners.womenBanner}  alt='women-category' className='w-80 sm:w-full h-full object-cover' />
                </Link>
                <div className='z-[2] absolute text-white top-[50%] translate-y-[-50%] left-5 right-5 text-center'>
                    <h1 className='text-2xl font-bold mb-3 lg:text-4xl'>Women's Collection</h1>
                    <Link to='' className='text-lg font-semibold pb-2 border-b-2'>Khám phá ngay</Link>
                </div>
            </div>
            {/* Men category */}
            <div className='relative flex-1 before:absolute before:top-0 before:left-0 hover:before:bg-black/50 before:pointer-events-none before:z-[1] before:w-full before:h-full before:transition before:duration-300 '>
                <Link to='/products/men' className=''>
                    <img src={categoryBanners.menBanner}  alt='men-category' className='w-80 sm:w-full h-full object-cover' />
                </Link>
                <div className='z-[2] absolute text-white top-[50%] translate-y-[-50%] left-5 right-5 text-center'>
                    <h1 className='text-2xl font-bold mb-3 xl:text-4xl'>Men's Collection</h1>
                    <Link to='' className='text-lg font-semibold pb-2 border-b-2'>Khám phá ngay</Link>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Category
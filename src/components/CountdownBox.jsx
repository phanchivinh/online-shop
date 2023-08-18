import React from 'react'

const CountdownBox = () => {
  return (
    <div className='flex'>
      <span className='flex flex-col items-center w-12 h-12  mx-3 bg-[#ffe501] rounded-md  '>
        <span className='text-xl'>0</span>
        <span className='text-xs'>Ngày</span>
      </span>
      <span className='flex flex-col items-center w-12 h-12  mx-3 bg-[#ffe501] rounded-md  '>
        <span className='text-xl'>00</span>
        <span className='text-xs'>Giờ</span>
      </span>
      <span className='flex flex-col items-center w-12 h-12  mx-3 bg-[#ffe501] rounded-md  '>
        <span className='text-xl'>00</span>
        <span className='text-xs'>Phút</span>
      </span>
      <span className='flex flex-col items-center w-12 h-12  mx-3 bg-[#ffe501] rounded-md  '>
        <span className='text-xl'>00</span>
        <span className='text-xs'>Giây</span>
      </span>
    </div>
  )
}

export default CountdownBox

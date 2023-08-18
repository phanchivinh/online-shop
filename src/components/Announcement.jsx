import React from 'react'
import { LiaCertificateSolid } from 'react-icons/lia'
import { GiCheckMark } from 'react-icons/gi'
import { TbTruckDelivery } from 'react-icons/tb'

const Announcement = () => {
  return (
    <div className='h-7 bg-blue-400 text-white font-extrabold flex items-center justify-center text-sm'>
      <LiaCertificateSolid className='mr-2 ml-3 text-2xl' /> Đảm bảo chất lượng
      <GiCheckMark className='mr-2 ml-3 text-2xl' /> Mở kiểm tra nhận hàng
      <TbTruckDelivery className='mr-2 ml-3 text-2xl' /> Vận chuyển siêu tốc
    </div>
  )
}

export default Announcement

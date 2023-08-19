import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { BsTelephoneFill } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='py-9 px-9'>
      {/* Wrapper */}
      <div className='border-t-2 border-t-blue-200'>
        {/* Top */}
        <div className='py-10 px-8 flex flex-col sm:flex-row justify-between border-b-2 border-b-blue-200 '>
          <div className=' sm:flex-1 lg:flex-none'>
            <h3 className='font-bold text-xl sm:text-2xl'>About us</h3>
            <ul className='mt-4'>
              <li className='hover:text-blue-400 opacity-80 text-sm sm:text-base'><Link>Điều khoản</Link></li>
              <li className='hover:text-blue-400 opacity-80 text-sm sm:text-base'><Link>Hướng dẫn mua hàng</Link></li>
              <li className='hover:text-blue-400 opacity-80 text-sm sm:text-base'><Link>Chính sách bảo mật</Link></li>
              <li className='hover:text-blue-400 opacity-80 text-sm sm:text-base'><Link>Chính sách đổi trả</Link></li>
              <li className='hover:text-blue-400 opacity-80 text-sm sm:text-base'><Link>Chính sách vận chuyển</Link></li>
            </ul>
          </div>
          <div className='sm:flex-1 lg:flex-none mt-6 sm:mt-0'>
            <h3 className='font-bold text-xl sm:text-2xl'>Contact</h3>
            <ul className='mt-4'>
              <li className='text-sm sm:text-base'><p>Địa chỉ: 123 Nguyễn Hữu Thọ, Tân Phong, Quận 7, Tp.Hồ Chí Minh</p></li>
              <li className='text-sm sm:text-base'><p>Số điện thoại: 0123456789</p></li>
              <li className='text-sm sm:text-base'><p>Email: vinhtrietshop@gmail.com</p></li>
            </ul>
            {/* Icons */}
            <div className='mt-4 flex max-[350px]:flex-wrap gap-4'>
              <button className='border-2 border-black/70 p-4 sm:p-2 text-lg rounded-full opacity-70 hover:bg-blue-500 hover:text-white hover:border-white'><FaFacebookF /></button>
              <button className='border-2 border-black/70 p-4 sm:p-2 text-lg rounded-full opacity-70 hover:bg-blue-500 hover:text-white hover:border-white'><FaInstagram /></button>
              <button className='border-2 border-black/70 p-4 sm:p-2 text-lg rounded-full opacity-70 hover:bg-blue-500 hover:text-white hover:border-white'><HiOutlineMail /></button>
              <button className='border-2 border-black/70 p-4 sm:p-2 text-lg rounded-full opacity-70 hover:bg-blue-500 hover:text-white hover:border-white'><BsTelephoneFill /></button>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className='mt-4 flex items-center justify-center'>
          <Link to='/' className='text-xs sm:text-sm md:text-base font-bold flex items-center  text-blue-600'>
            <span className='text-white bg-[#23304c] p-2 rounded-xl mr-2'>
              V
              <span className='text-xs sm:text-[4px] md:text-xs'>&</span>
              T
            </span>
          </Link>
          <p className='text-sm'>© Copy Right 2023. All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer

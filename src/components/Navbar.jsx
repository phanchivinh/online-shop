import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'
import { BsSearch, BsCartPlus } from 'react-icons/bs'
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi'
import { FaUserPlus } from 'react-icons/fa'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)
  // const location = useLocation()

  const cartRef = useRef()

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <nav className='navbar py-2 px-4 md:py-4 md:px-10 z-10'>
      {/* Wrapper */}
      <div className='flex justify-between items-center '>
        <AiOutlineMenu className='text-2xl md:hidden cursor-pointer' onClick={showSidebar} />
        {/* Left */}
        <div className='flex items-center'>
          {/* Logo */}
          <Link to='/' className='text-xl sm:text-2xl md:text-3xl font-bold flex items-center  text-blue-600'>
            <span className='text-white bg-[#23304c] p-2 rounded-xl mr-2'>
              V
              <span className='text-xs sm:text-sm md:text-xl'>&</span>
              T
            </span>
          </Link>
          <ul className='hidden md:flex items-center'>
            <li className='font-bold text-xl hover:opacity-70'><Link to=''>Trang chủ</Link></li>
            <li className='group/item mx-2 relative'>
              <Link to='' className='font-bold text-xl hover:opacity-70'>Nam</Link>
              <ul className='z-10 absolute shadow-md shadow-black top-14 bg-white group-hover/item:block hidden'>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Tất cả sản phẩm</Link></li>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Áo thun</Link></li>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Quần</Link></li>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Phụ kiện</Link></li>
              </ul>
            </li>
            <li className='group/item mx-2 relative'>
              <Link to='' className='font-bold text-xl hover:opacity-70'>Nữ</Link>
              <ul className='z-10 absolute shadow-md shadow-black top-14 bg-white group-hover/item:block hidden'>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Tất cả sản phẩm</Link></li>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Áo thun</Link></li>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Quần</Link></li>
                <li className='text-sm min-w-[150px] p-2 group-hover/item:block border-b border-gray '><Link to=''>Phụ kiện</Link></li>
              </ul>
            </li>
            <li className='group/item mx-2 relative'>
              <Link to='' className='font-bold text-xl hover:opacity-70'>Giảm giá</Link>
            </li>
            <li className='group/item mx-2 relative'>
              <Link to='' className='font-bold text-xl hover:opacity-70'>Về chúng tôi</Link>
            </li>
          </ul>
        </div>
        {/* Right */}
        <div className='flex'>
          {/* search box */}
          <div className='hidden md:flex border-2 border-blue-300'>
            <input type='text' placeholder='Tìm kiếm...' className='outline-none px-1 border-r-2 border-r-blue-300' />
            <div className='m-2 text-2xl hover:text-blue-500 cursor-pointer'><BsSearch /></div>
          </div>
          {/* User */}
          {/* {location.state.fullName && <span>{location.state.fullName}</span>} */}
          <Link to='/login' className='hidden md:block m-2 text-2xl hover:text-blue-500 cursor-pointer'><AiOutlineUser /></Link>
          <div className='m-2 text-2xl relative hover:text-blue-500 cursor-pointer' onClick={() => cartRef.current.setOpenCart(true)}>
            <BsCartPlus />
            <span className='absolute top-[-10px] right-[-10px] text-sm bg-blue-600 text-white px-2 rounded-full'>0</span>
          </div>
        </div>
      </div>
      {/* Mobile searchbar */}
      <div className='flex justify-between w-full border-2 border-blue-300 md:hidden mt-4'>
        <input type='text' placeholder='Tìm kiếm...' className='outline-none order-r-2 m-2 border-r-blue-300 w-full' />
        <div className='m-2 text-2xl hover:text-blue-500 cursor-pointer'><BsSearch /></div>
      </div>

      {/* Modal mobile menu */}
      {/* {sidebar && <div className='fixed md:hidden w-screen h-screen top-0 left-0 bg-black/70 z-10' />} */}
      <div className={`fixed md:hidden z-20 w-screen h-screen bg-white top-0 duration-300 ease-linear ${sidebar ? 'left-0' : 'left-[-110%]'}`}>
        <AiOutlineClose className='absolute text-2xl right-3 top-3 cursor-pointer' onClick={showSidebar} />
        {/* User */}
        <div className='mt-8 px-4 text-xl'>
          <Link to='/login' className='flex items-center py-2 hover:bg-gray-200'>
            <BiLogIn className='mr-3' />
            Đăng nhập
          </Link>
          <Link to='/register' className='flex items-center py-2 hover:bg-gray-200'>
            <FaUserPlus className='mr-3' />
            Đăng ký
          </Link>
        </div>
        <div className='border border-b-gray-400' />
        {/* Shop */}
        <div className='mt-4 mx-4 text-xl'>
          <ul className=''>
            <li className='font-bold my-4 border-b-gray-300 border-b-2'>
              Sản phẩm
              <ul className='font-normal text-base ml-4'>
                <li className='my-2 hover:bg-gray-200'><Link to='/'>Tất cả sản phẩm</Link></li>
                <li className='my-2 hover:bg-gray-200'><Link to='/'>Áo thun</Link></li>
                <li className='my-2 hover:bg-gray-200'><Link to='/'>Quần</Link></li>
                <li className='my-2 hover:bg-gray-200'><Link to='/'>Phụ kiện</Link></li>
              </ul>
            </li>
            <li className='my-4 font-bold hover:bg-gray-200 border-b-gray-300 border-b-2'><Link to=''>Sale</Link></li>
            <li className='my-4 font-bold hover:bg-gray-200 border-b-gray-300 border-b-2'><Link to=''>About Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Cart */}
      <Cart ref={cartRef} />
    </nav>
  )
}

export default Navbar

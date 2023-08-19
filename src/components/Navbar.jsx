import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'
import { BsSearch, BsCartPlus } from 'react-icons/bs'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi'
import { FaUserPlus } from 'react-icons/fa'
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { TfiSettings } from 'react-icons/tfi'
import { FiLogOut } from 'react-icons/fi'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)
  // const location = useLocation()
  const [anchorElMen, setAnchorElMen] = React.useState(null);
  const [anchorElWomen, setAnchorElWomen] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openMen = Boolean(anchorElMen);
  const openWomen = Boolean(anchorElWomen);
  const openUser = Boolean(anchorElUser);

  const handleMenClick = (event) => {
    setAnchorElMen(event.currentTarget);
  };
  const handleWomenClick = (event) => {
    setAnchorElWomen(event.currentTarget);
  };
  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenClose = () => {
    setAnchorElMen(null);
  };
  const handleWomenClose = () => {
    setAnchorElWomen(null);
  };
  const handleUserClose = () => {
    setAnchorElUser(null);
  };


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
            <li className='group/item mx-2 relative text-black'>
              <Button id="men-menu-button" aria-controls={openMen ? 'men-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMen ? 'true' : undefined}
                onClick={handleMenClick}
              >
                <p className='text-black font-bold text-xl'>Nam</p>
              </Button>
              <Menu id='men-menu'
                aria-labelledby="men-menu-button"
                anchorEl={anchorElMen}
                open={openMen}
                onClose={handleMenClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={handleMenClose}>Áo thun</MenuItem>
                <MenuItem onClick={handleMenClose}>Áo sơ-mi</MenuItem>
                <MenuItem onClick={handleMenClose}>Áo bóng đá</MenuItem>
              </Menu>
            </li>
            <li className='group/item mx-2 relative'>
              <Button id="women-menu-button" aria-controls={openWomen ? 'women-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openWomen ? 'true' : undefined}
                onClick={handleWomenClick}
              >
                <p className='text-black font-bold text-xl'>Nữ</p>
              </Button>
              <Menu id='women-menu'
                aria-labelledby="women-menu-button"
                anchorEl={anchorElWomen}
                open={openWomen}
                onClose={handleWomenClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={handleWomenClose}>Áo thun</MenuItem>
                <MenuItem onClick={handleWomenClose}>Áo thun nữ</MenuItem>
                <MenuItem onClick={handleWomenClose}>Váy</MenuItem>
              </Menu>
            </li>
            <li className='group/item mx-2 relative'>
              <Link to='' className='font-bold text-xl hover:opacity-70'>ABOUT US</Link>
            </li>
          </ul>
        </div>
        {/* Right */}
        <div className='flex'>
          {/* search box */}
          <div className='hidden md:flex border-2 border-blue-300 rounded-md overflow-hidden'>
            <input type='text' placeholder='Tìm kiếm...' className='outline-none px-1 border-r-2 border-r-blue-300' />
            <div className='w-full h-full p-2 text-2xl hover:bg-blue-500 hover:text-white duration-150 cursor-pointer'><BsSearch /></div>
          </div>
          {/* User */}
          {/* {location.state.fullName && <span>{location.state.fullName}</span>} */}
          <Link to='/login' className='hidden md:block m-2 text-sm hover:text-blue-500 cursor-pointer'>
            ĐĂNG NHẬP/ĐĂNG KÝ
          </Link>
          {/* <div>
            <Tooltip title="Account Setting">
              <IconButton
                onClick={handleUserClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openUser ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openUser ? 'true' : undefined}
              >
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={openUser}
              onClose={handleUserClose}
              onClick={handleUserClose}
            >
              <MenuItem onClick={handleUserClose}>
                <ListItemIcon>
                  <TfiSettings />
                </ListItemIcon>
                Tài khoản
              </MenuItem>
              <MenuItem onClick={handleUserClose}>
                <ListItemIcon>
                  <FiLogOut />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
          </div> */}

          {/* Cart */}
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

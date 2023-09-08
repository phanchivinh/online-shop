import React, { useState, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Cart from './Cart'
import { BsSearch, BsCartPlus } from 'react-icons/bs'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi'
import { FaUserPlus } from 'react-icons/fa'
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { TfiSettings } from 'react-icons/tfi'
import { FiLogOut } from 'react-icons/fi'
import { categories } from '../model/data/mockData'
import { publicRequest } from '../requestMethod'
import { logout } from '../redux/authRedux'
import NavigationList from './NavigationList'
import SearchField from './SearchField'

function buildCategoryTree(categories, parent = null) {
  const categoryTree = [];

  for (const category of categories) {
    if (category.category_parent === parent) {
      const subcategories = buildCategoryTree(categories, category.category_id);

      if (subcategories.length > 0) {
        category.subcategories = subcategories;
      }

      categoryTree.push(category);
    }
  }

  return categoryTree;
}

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotalItems = useSelector(state => state.cart.totalQuantity)
  const accessToken = useSelector(state => state.auth.accessToken)
  const [sidebar, setSidebar] = useState(false)
  // const location = useLocation()
  const [anchorElMen, setAnchorElMen] = React.useState(null);
  const [anchorElWomen, setAnchorElWomen] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [categoryTree, setCategoryTree] = React.useState();
  const openMen = Boolean(anchorElMen);
  const openWomen = Boolean(anchorElWomen);
  const openUser = Boolean(anchorElUser);

  useLayoutEffect(() => {
    const categoryTree = buildCategoryTree(categories);
    // console.log(JSON.stringify(categoryTree, null, 2));
    setCategoryTree(categoryTree)
  }, [])

  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onSignOut = async (event) => {
    try {
      dispatch(logout());
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

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
          {categoryTree && <NavigationList categoryTree={categoryTree} />}

          <Link to='/AboutUs' className='font-bold text-blue-500 hover:opacity-70'>ABOUT US</Link>


        </div>
        {/* Right */}
        <div className='flex'>
          {/* search box */}
          <SearchField />
          {/* User */}
          {/* {location.state.fullName && <span>{location.state.fullName}</span>} */}
          {
            isAuthenticated
              ? (<div>
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
                  <MenuItem onClick={() => navigate(`/userInfo`)}>
                    <ListItemIcon>
                      <TfiSettings />
                    </ListItemIcon>
                    Tài khoản
                  </MenuItem>
                  <MenuItem onClick={() => { }}>
                    <ListItemIcon>
                      <TfiSettings />
                    </ListItemIcon>
                    Đổi mật khẩu
                  </MenuItem>
                  <MenuItem onClick={(event) => onSignOut(event)}>
                    <ListItemIcon>
                      <FiLogOut />
                    </ListItemIcon>
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>)

              : (
                <span className='flex justify-center items-center'>
                  <Link to='/login' className='hidden md:block m-2 text-sm hover:text-blue-500 cursor-pointer'>
                    ĐĂNG NHẬP
                  </Link>
                  <Link to='/register' className='hidden md:block m-2 text-sm hover:text-blue-500 cursor-pointer'>
                    ĐĂNG KÝ
                  </Link>
                </span>
              )
          }

          {/* Cart */}
          <div className='m-2 text-2xl relative hover:text-blue-500 cursor-pointer' onClick={() => cartRef.current.setOpenCart(true)}>
            <BsCartPlus />
            <span className='absolute top-[-10px] right-[-10px] text-sm bg-blue-600 text-white px-2 rounded-full'>{cartTotalItems}</span>
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

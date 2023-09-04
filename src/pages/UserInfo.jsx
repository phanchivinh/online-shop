import React, { useEffect, useState } from 'react'
import { MdPermIdentity, MdPhoneAndroid, MdLocationOn, MdPublish } from 'react-icons/md'
import { AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiSingleUser } from '../model/data/mockData'
import { publicRequest } from '../requestMethod'
import UserOrders from '../components/UserOrders'

const UserInfo = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const accessToken = useSelector(state => state.auth.accessToken)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")

  const handleUpdate = async () => {
    try {
      const response = await publicRequest.post('/v1/management/users.update', {
        ...user,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        address: address
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      debugger
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await publicRequest.get('/v1/users/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => res.data)
      // const response = apiSingleUser
      const userInfos = JSON.parse(JSON.stringify(response.data))
      setUser(response.data)
      setFirstName(userInfos.user_first_name || '');
      setLastName(userInfos.user_last_name || '')
      setPhoneNumber(userInfos.user_phone_number || '');
      setAddress(userInfos.user_address || '')
    }
    getUser()
  }, [])

  return (
    <div className='flex flex-col justify-center items-center mx-10'>
      {/* User Title Container */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Tài khoản của bạn</h1>
      </div>
      {/* User Container */}
      <div className='flex flex-col mt-5 w-full'>

        {/* User show */}
        <div className='flex-1 p-5 shadow-lg shadow-blue-500 mb-4 mr-6'>
          {/* User show Top */}
          <div className='flex items-center'>
            {/* <img alt='' src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className='w-10 h-10 rounded-full object-cover' /> */}
            {/* USer show top title */}
            <div className='flex flex-col'>
              {/* User show Username */}
              <div className='font-semibold'>{`${user.user_last_name} ${user.user_first_name}`}</div>
              {/* User show Title */}
              <div className='font-light'>{user.user_id}</div>
            </div>
          </div>
          {/* User show Bottom */}
          <div className='mt-5'>
            {/* User Show Title */}
            <span className='text-sm font-semibold text-gray-400'>Thông tin tài khoản</span>
            {/* -----User show Info----- */}
            <div className='flex items-center my-5 text-[#444]'>
              <MdPermIdentity className='text-lg' />
              {/* Show Info Title */}
              <span className='ml-2'>{user.user_email}</span>
            </div>

            {/* -----User show Info----- */}
            {/* <div className='flex items-center my-5 text-[#444]'>
              <AiOutlineCalendar className='text-lg' />
              <span className='ml-2'>{user.create_date_time}</span>
            </div> */}

            <span className='text-sm font-semibold text-gray-400'>Thông tin liên lạc</span>
            {/* -----User show Info----- */}
            <div className='flex items-center my-5 text-[#444]'>
              <MdPhoneAndroid className='text-lg' />
              {/* Show Info Title */}
              <span className='ml-2'>{user.user_phone_number}</span>
            </div>

            {/* -----User show Info----- */}
            <div className='flex items-center my-5 text-[#444]'>
              <AiOutlineMail className='text-lg' />
              {/* Show Info Title */}
              <span className='ml-2'>{user.user_email}</span>
            </div>

            {/* -----User show Info----- */}
            <div className='flex items-center my-5 text-[#444]'>
              <MdLocationOn className='text-lg' />
              {/* Show Info Title */}
              <span className='ml-2'>{user.user_address}</span>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------- */}
        <div className='flex items-center justify-center'>
          <h1 className='text-2xl font-semibold'>Đơn hàng đã đặt</h1>
        </div>
        <UserOrders />
      </div >
    </div >
  )
}

export default UserInfo

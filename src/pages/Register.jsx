import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        fullName,
        phoneNumber
      }).then(res => {
        if (res.data) {
          console.log(res.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='flex justify-center pt-6'>
      <form>
        <h1 className='text-center uppercase text-xl min-[425px]:text-2xl font-bold'>Đăng ký tài khoản</h1>
        <div className='w-52 min-[425px]:w-96 h-2 mb-4 min-[425px]:mb-10 border-b-4 border-b-blue-300' />

        {/* Register field */}
        <div>
          {/* Email Input */}
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='email' className='font-bold text-black/80'>Email:</label>
            <input type='email' value={email} id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email...' className='border border-black/70 focus:border-black p-2' />
          </div>
          {/* Password Input */}
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='password' className='font-bold text-black/80'>Mật khẩu:</label>
            <input type='password' value={password} id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Mật khẩu...' className='border border-black/70 focus:border-black p-2' />
          </div>
          {/* Full name Input */}
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='name' className='font-bold text-black/80'>Họ và Tên:</label>
            <input type='text' value={fullName} id='name' onChange={(e) => setFullName(e.target.value)} placeholder='Họ và tên...' className='border border-black/70 focus:border-black p-2' />
          </div>
          {/* Phone Number Field */}
          <div className='flex flex-col gap-1 mb-8'>
            <label htmlFor='phone' className='font-bold text-black/80'>Số điện thoại:</label>
            <input type='text' value={phoneNumber} id='phone' onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Số điện thoại...' className='border border-black/70 focus:border-black p-2' />
          </div>
        </div>

        <div className='flex flex-col gap-4 items-center mb-10'>
          <button type='submit' onClick={(e) => onSignUp(e)} className='w-full min-[425px]:w-48 border-2 border-blue-400 text-blue-400 p-2 font-bold hover:bg-blue-400 hover:text-white duration-300 ease-linear uppercase'>Đăng ký</button>
          <span>Bạn đã có tài khoản? <Link to='/login' className='underline hover:text-blue-400'>Đăng nhập</Link></span>
        </div>

        {/* Login with social */}
        <div className='flex flex-col items-center gap-3'>
          <button className='flex p-1 text-white text-lg w-52 justify-center items-center gap-2 bg-blue-700 hover:opacity-80'><FaFacebookF /> Đăng nhập với Facebook</button>
          <button className='flex p-1 text-white text-lg w-52 justify-center items-center gap-2 bg-red-700 hover:opacity-80'><FaGooglePlusG /> Đăng nhập với Google</button>
        </div>
      </form>
    </div>
  )
}

export default Register

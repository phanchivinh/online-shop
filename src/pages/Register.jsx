import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'

const Register = () => {
  return (
    <div className='flex justify-center pt-6'>
        <form>
            <h1 className='text-center uppercase text-xl min-[425px]:text-2xl font-bold'>Đăng ký tài khoản</h1>
            <div className='w-52 min-[425px]:w-96 h-2 mb-4 min-[425px]:mb-10 border-b-4 border-b-blue-300' />

            {/* Login field */}
            <div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='email' className='font-bold text-black/80'>Email:</label>
                    <input type='email' id='email' placeholder='Email...' className='border border-black/70 focus:border-black p-2'/>
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='password'  className='font-bold text-black/80'>Mật khẩu:</label>
                    <input type='password' id='password' placeholder='Mật khẩu...' className='border border-black/70 focus:border-black p-2' />
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='password2'  className='font-bold text-black/80'>Nhập lại mật khẩu:</label>
                    <input type='password' id='password2' placeholder='Nhập lại mật khẩu...' className='border border-black/70 focus:border-black p-2' />
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='name' className='font-bold text-black/80'>Họ và Tên:</label>
                    <input type='text' id='name' placeholder='Họ và tên...' className='border border-black/70 focus:border-black p-2'/>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                    <label htmlFor='phone' className='font-bold text-black/80'>Số điện thoại:</label>
                    <input type='text' id='phone' placeholder='Số điện thoại...' className='border border-black/70 focus:border-black p-2'/>
                </div>
            </div>

            <div className='flex flex-col gap-4 items-center mb-10'>
                <button type='submit' className='w-full min-[425px]:w-48 border-2 border-blue-400 text-blue-400 p-2 font-bold hover:bg-blue-400 hover:text-white duration-300 ease-linear uppercase'>Đăng ký</button>
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
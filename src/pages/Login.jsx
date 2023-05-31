import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'

const Login = () => {
  return (
    <div className='flex justify-center pt-6'>
        <form>
            <h1 className='text-center uppercase text-xl min-[425px]:text-2xl font-bold'>Đăng nhập tài khoản</h1>
            <div className='w-52 min-[425px]:w-96 h-2 mb-4 min-[425px]:mb-10 border-b-4 border-b-blue-300' />

            {/* Login field */}
            <div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='email' className='font-bold'>Email:</label>
                    <input type='email' id='email' placeholder='Email...' className='border border-black/70 focus:border-black p-2'/>
                </div>
                <div className='flex flex-col gap-1 mb-8'>
                    <label htmlFor='password'  className='font-bold'>Mật khẩu:</label>
                    <input type='password' id='password' placeholder='Mật khẩu...' className='border border-black/70 focus:border-black p-2' />
                </div>
            </div>

            <div className='flex flex-col gap-4 items-center mb-10'>
                <button type='submit' className='w-full min-[425px]:w-48 border-2 border-blue-400 text-blue-400 p-2 font-bold hover:bg-blue-400 hover:text-white duration-300 ease-linear uppercase'>Đăng nhập</button>
                <Link to='' className='font-bold opacity-80 hover:opacity-100 hover:underline'>Quên mật khẩu?</Link>
                <span>Bạn chưa có tài khoản? Đăng ký <Link to='/register' className='underline hover:text-blue-400'>tại đây.</Link></span>
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

export default Login
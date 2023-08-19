import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'
import { Autocomplete, TextField } from '@mui/material'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)

  // Address Options
  const [provinceOptions, setProvinceOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])

  /* -------------------------------- */
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
  ]
  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      }).then(res => {
        if (res.data) {
          console.log(res.data)
          debugger
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  //useEffect to fetch Provinces
  useEffect(() => {
    const getProvinceData = async () => {
      try {
        const resData = await axios.get('https://provinces.open-api.vn/api/p/').then(res => res.data)
        const provinces = resData.map(item => ({
          label: item.name,
          code: item.code
        }))
        setProvinceOptions(provinces)
      } catch (error) {
        console.log(error)
      }
    }
    getProvinceData()
  }, [])

  //TODO - handle change here

  /* -------------------------------- */
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
            <label htmlFor='name' className='font-bold text-black/80'>Họ và tên đệm:</label>
            <input type='text' value={firstName} id='name' onChange={(e) => setFirstName(e.target.value)} placeholder='Họ và tên đệm...' className='border border-black/70 focus:border-black p-2' />
          </div>
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='name' className='font-bold text-black/80'>Tên:</label>
            <input type='text' value={lastName} id='name' onChange={(e) => setLastName(e.target.value)} placeholder='Tên...' className='border border-black/70 focus:border-black p-2' />
          </div>
          {/* Phone Number Field */}
          <div className='flex flex-col gap-1 mb-8'>
            <label htmlFor='phone' className='font-bold text-black/80'>Số điện thoại:</label>
            <input type='text' value={phoneNumber} id='phone' onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Số điện thoại...' className='border border-black/70 focus:border-black p-2' />
          </div>

          <div>
            <label htmlFor='phone' className='font-bold text-black/80'>Địa chỉ:</label>
            <div>
              <Autocomplete
                disablePortal
                id="province-box"
                options={provinceOptions}
                value={selectedProvince}
                onChange={(event, value) => setSelectedProvince(value.label)}
                sx={{ height: 70 }}
                renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
              />
              <Autocomplete
                disablePortal
                id="dítrict-box"
                options={districtOptions}
                value={selectedDistrict}
                onChange={(event, value) => setSelectedDistrict(value.label)}
                sx={{ height: 70 }}
                renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
              />
            </div>
            <div>
              <Autocomplete
                disablePortal
                id="ward-box"
                options={wardOptions}
                value={selectedWard}
                onChange={(event, value) => setSelectedWard(value.label)}
                sx={{ height: 70 }}
                renderInput={(params) => <TextField {...params} label="Phường/Xã" />}
              />
            </div>
            <div>

            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 items-center mb-10'>
          <button type='submit' onClick={(e) => onSignUp(e)} className='w-full min-[425px]:w-48 border-2 border-blue-400 text-blue-400 p-2 font-bold hover:bg-blue-400 hover:text-white duration-300 ease-linear uppercase'>Đăng ký</button>
          <span>Bạn đã có tài khoản? <Link to='/login' className='underline hover:text-blue-400'>Đăng nhập</Link></span>
        </div>

        {/* Login with social */}
        {/* <div className='flex flex-col items-center gap-3'>
          <button className='flex p-1 text-white text-lg w-52 justify-center items-center gap-2 bg-blue-700 hover:opacity-80'><FaFacebookF /> Đăng nhập với Facebook</button>
          <button className='flex p-1 text-white text-lg w-52 justify-center items-center gap-2 bg-red-700 hover:opacity-80'><FaGooglePlusG /> Đăng nhập với Google</button>
        </div> */}
      </form>
    </div>
  )
}

export default Register

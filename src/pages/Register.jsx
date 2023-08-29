import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'
import { Autocomplete, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { publicRequest } from '../requestMethod'
import { loginSuccess } from '../redux/authRedux'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("test")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedWard, setSelectedWard] = useState("")
  const [houseNumber, setHouseNumber] = useState("")


  // Address Options
  const [provinceOptions, setProvinceOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])

  /* -------------------------------- */
  const onSignUp = async (event) => {
    event.preventDefault();
    const address = `${houseNumber ? `${houseNumber},` : ""} ${selectedWard ? `${selectedWard},` : ""} ${selectedDistrict ? `${selectedDistrict},` : ""} ${selectedProvince || ""}`
    try {
      await axios.post("https://shopping-back-end.minhtriet.dev/api/v1/auth/user/sign-up", {
        "email": email,
        "password": password,
        "first_name": firstName,
        "last_name": lastName,
        "address": address,
        "phone_number": phoneNumber
      }).then(res => {
        if (!res.data.success) {
          setErrorMessage(res.data.message)
          return
        }
        handleSignIn(email, password)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSignIn = async ({ successEmail, successPassword }) => {
    try {
      const response = await publicRequest.post('/v1/auth/user/sign-in', {
        successEmail,
        successPassword
      })
      dispatch(loginSuccess(response.data.data))
      navigate("/")
    } catch (error) {
      console.error('Đăng nhập thất bại: ', error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated, navigate])

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

  const onProvinceChange = async (event, province) => {
    setSelectedProvince(province.label)
    try {
      const resData = await axios.get(`https://provinces.open-api.vn/api/p/${province.code}/?depth=2`).then(res => res.data)
      const districts = resData.districts.map(item => ({
        label: item.name,
        code: item.code
      }))
      setDistrictOptions(districts)
      return
    } catch (error) {
      console.log(error)
      return
    }
  }

  const onDistrictChange = async (event, district) => {
    setSelectedDistrict(district.label);
    try {
      const resData = await axios.get(`https://provinces.open-api.vn/api/d/${district.code}/?depth=2`).then(res => res.data)
      const wards = resData.wards.map(item => ({
        label: item.name,
        code: item.code
      }))
      setWardOptions(wards)
      return
    } catch (error) {
      console.log(error)
      return
    }
  }

  /* -------------------------------- */
  return (
    <div className='flex justify-center pt-6'>
      <form onSubmit={(event) => onSignUp(event)}>
        <h1 className='text-center uppercase text-xl min-[425px]:text-2xl font-bold'>Đăng ký tài khoản</h1>
        <div className='w-52 min-[425px]:w-96 h-2 mb-4 min-[425px]:mb-10 border-b-4 border-b-blue-300' />

        {/* Register field */}
        <div>
          <p className='text-red-600'>{errorMessage}</p>
          {/* Email Input */}
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='email' className='font-bold text-black/80'>Email:</label>
            <input type='email' name='email' value={email} id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email...' className='border border-black/70 focus:border-black p-2' />
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
            <label htmlFor='phone' className='font-bold text-black/80'>
              Địa chỉ:
              <p>
                {
                  `${houseNumber ? `${houseNumber},` : ""} ${selectedWard ? `${selectedWard},` : ""} ${selectedDistrict ? `${selectedDistrict},` : ""} ${selectedProvince || ""}`
                }
              </p>
            </label>
            <div className='my-4 p-2 border border-blue-400 rounded-lg'>
              <Autocomplete
                disablePortal
                id="province-box"
                options={provinceOptions}
                onChange={async (event, value) => { await onProvinceChange(event, value) }}
                sx={{ height: 70 }}
                size='sm'
                renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
              />
              <Autocomplete
                disablePortal
                id="dítrict-box"
                options={districtOptions}
                onChange={async (event, value) => await onDistrictChange(event, value)}
                sx={{ height: 70 }}
                size='sm'
                renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
              />
              <Autocomplete
                disablePortal
                id="ward-box"
                options={wardOptions}
                size='sm'
                onChange={(event, value) => setSelectedWard(value.label)}
                sx={{ height: 70 }}
                renderInput={(params) => <TextField {...params} label="Phường/Xã" />}
              />
              <input type='text' value={houseNumber} id='phone' onChange={(e) => setHouseNumber(e.target.value)} placeholder='Số nhà, đường...' className='border border-black/70 focus:border-black p-4 w-full rounded-md' />
            </div>
            <div>

            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 items-center mb-10'>
          <button type='submit' className='w-full min-[425px]:w-48 border-2 border-blue-400 text-blue-400 p-2 font-bold hover:bg-blue-400 hover:text-white duration-300 ease-linear uppercase'>Đăng ký</button>
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

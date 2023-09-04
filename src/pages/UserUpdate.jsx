import React from 'react'

const UserUpdate = () => {
  return (
    {/* User Update */ }
    < div className = 'flex-[2] p-5 shadow-lg shadow-blue-500' >
      <div>
        {/* User Update Title */}
        <span className='text-2xl font-semibold'>Chỉnh sửa</span>
        {/* Update Form */}
        <form className='flex justify-between mt-5'>
          {/* Left */}
          <div>
            {/* Update Item */}
            <div className='flex flex-col mt-2 text-sm'>
              <label className='font-bold text-lg mb-2'>Họ và tên đệm</label>
              <input type='text' placeholder='user99' className='w-60 h-8 border-b border-gray-400' value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
            </div>

            {/* Update Item */}
            <div className='flex flex-col mt-2  text-sm'>
              <label className='font-bold text-lg mb-2'>Tên</label>
              <input type='text' placeholder='User' className='w-60 h-8 border-b border-gray-400' value={firstName} onChange={event => setFirstName(event.target.value)}></input>
            </div>

            {/* Update Item */}
            <div className='flex flex-col mt-2  text-sm'>
              <label className='font-bold text-lg mb-2'>Phone</label>
              <input type='text' placeholder='0903 123 456' className='w-60 h-8 border-b border-gray-400' value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} ></input>
            </div>

            {/* Update Item */}
            <div className='flex flex-col mt-2  text-sm'>
              <label className='font-bold text-lg mb-2'>Address</label>
              <input type='text' placeholder='Ho Chi Minh city' className='w-60 h-8 border-b border-gray-400' value={address} onChange={event => setAddress(event.target.value)}></input>
            </div>
          </div>
          {/* Right */}
          <div className='flex flex-col justify-between'>
            {/* User update upload */}
            {/* <div className='flex items-center'>
             <img alt='' src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' className='w-24 h-24 rounded-lg object-cover mr-5' />
             <label htmlFor='file'><MdPublish className='text-2xl cursor-pointer' /></label>
             <input type='file' id='file' style={{ display: "none" }} />
           </div> */}
            {/* User update button */}
            <button onClick={handleUpdate} className='rounded-md p-1 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-semibold'>Update</button>
          </div>
        </form>
      </div>
   </div >
  )
}

export default UserUpdate

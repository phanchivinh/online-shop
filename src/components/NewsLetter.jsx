import React from 'react'

const NewsLetter = () => {
  return (
    <div className='bg-[#009dde] h-20 flex justify-center items-center'>
      {/* Wrapper */}
      <div className='flex'>
        {/* Newsletter Title */}
        <div className='text-white text-right'>
          <h3 className='font-bold text-2xl'>Đăng ký để nhận bản tin</h3>
          <p>Để nhận thêm thông tin về các sản phẩm mới nhất cũng như mã khuyến mãi dành riêng cho bạn</p>
        </div>
        {/* Newsletter Form */}
        <div className='ml-2 flex items-center'>
          <form className='flex justify-around'>
            <input id='newsleter-mail' className='p-2 rounded-lg w-full mr-2' placeholder='Vui lòng nhập Email của bạn' />
            <button className='bg-[#f9bb01] w-20 rounded-lg'>Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter

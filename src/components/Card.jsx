import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa'

const Card = ({ item }) => {
  const IMAGE_URL =
    'https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg';

  return (
    <Link
      to={`/product/${item.product_id}`}
      className="flex justify-center items-center mb-6"
    >
      <div className="w-full min-[525px]:w-[200px] hover:scale-110 duration-200 rounded-lg overflow-hidden flex flex-col justify-center items-center bg-white shadow-sm shadow-black">
        {/* image */}
        <div className=" w-full h-[180px] min-[525px]:h-[240px] mb-1 overflow-hidden relative group">
          <img
            src={item?.product_images[0]?.image_url || IMAGE_URL}
            alt={`${item.product_name}`}
            className='object-cover w-full'
          />
        </div>
        <div className="font-bold text-xs h-14 ml-2 min-[525px]:text-sm">
          <h3 className="text-left">{item.product_name}</h3>
        </div>

        <div className='mx-2 w-full flex justify-evenly'>
          <p className={`text-left font-bold mb-2 ${item.product_discount_price > 0 ? 'text-red-300 line-through text-sm' : 'text-red-700'}`}>
            {item.product_price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              useGrouping: true,
            })}
          </p>
          {
            item.product_discount_price > 0 && (<p className='text-left text-xl font-bold mb-2 text-red-600'>
              {item.product_price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </p>)
          }
        </div>
        <button className='flex mb-2 items-center text-sm bg-yellow-400 hover:bg-yellow-300 p-2 rounded-lg'>
          <FaCartPlus className='mr-2' />
          Thêm vào giỏ
        </button>
      </div>
    </Link>
  );
};

export default Card;

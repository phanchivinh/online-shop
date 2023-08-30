import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa'
import Product from '../pages/Product';



const Card = ({ item }) => {
  // const [onOpenDetail, setOnOpenDetail] = React.useState(false)
  const navigate = useNavigate()
  const IMAGE_URL =
    'https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg';

  return (
    <div key={`product-${item.product_id}`} className="w-full min-[525px]:w-[200px] rounded-lg overflow-hidden flex flex-col justify-center items-center bg-white shadow-sm shadow-black group">
      {/* image */}
      <div className=" w-full h-[180px] min-[525px]:h-[240px] mb-1 overflow-hidden relative group">
        <Link
          to={`/product/${item.product_id}`}
          className="flex justify-center items-center mb-6 w-full h-full"
        >

          <img
            src={item?.product_image || IMAGE_URL}
            alt={`${item.product_name}`}
            className='object-cover w-full group-hover:scale-110 transform  duration-200'
          />
        </Link>
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
            {item.product_discount_price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              useGrouping: true,
            })}
          </p>)
        }
      </div>
      <button className='flex mb-2 items-center text-sm bg-yellow-400 hover:bg-yellow-300 p-2 rounded-lg' onClick={() => navigate(`/product/${item.product_id}`)} >
        <FaCartPlus className='mr-2' />
        Thêm vào giỏ
      </button>


      {/* <Modal
        open={onOpenDetail}
        onClose={() => setOnOpenDetail(false)}
      >
        <span>
          <ProductModal />
        </span>
      </Modal> */}
    </div>
  );
};

export default Card;

import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
  const IMAGE_URL =
    'https://res.cloudinary.com/dnatymzuo/image/upload/shopping-web/ao-so-mi-oxford_lnbnqu.jpg';

  return (
    <Link
      to={`/product/${item._id}`}
      className="flex justify-center items-center mb-6"
    >
      <div className="w-full min-[525px]:w-[200px] flex flex-col justify-center items-center">
        {/* image */}
        <div className="mb-4 w-full h-[200px] min-[525px]:h-[280px] overflow-hidden relative group">
          <img
            src={IMAGE_URL}
            alt={`${item.title}`}
          // className="w-full h-full object-cover absolute"
          />
        </div>
        <div className="font-bold text-xs min-[525px]:text-sm">
          <h3 className="text-center">{item.title}</h3>
          <h3 className="text-center">
            {item.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              useGrouping: true,
            })}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

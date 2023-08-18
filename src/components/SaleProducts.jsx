import React, { useEffect, useState } from 'react';
import Card from './Card';
import { productData } from '../model/data/mockData';
import CountdownBox from './CountdownBox';

const getProducts = async () => {
  try {
    const response = await productData;
    return response;
  } catch (error) {
    console.log(error);
  }
};

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  // Fetch data:
  useEffect(() => {
    // Get products:
    getProducts().then((response) => {
      setProducts(response);
    });
  });

  return (
    <div className="mb-10 mx-4 sm:m-10 2xl:mx-96 bg-[#d0021b] rounded-lg">
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-lg sm:text-2xl text-white font-bold mt-8">SẢN PHẨM KHUYẾN MÃI</h2>
        {/* Box countdown */}
        <CountdownBox />
      </div>
      {/* product list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-12">
        {products.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default SaleProducts;

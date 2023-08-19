import React, { useEffect, useState } from 'react';
import Card from './Card';
import { productData } from '../model/data/mockData';
import CountdownBox from './CountdownBox';
import axios from 'axios';

const fetchAPI = async () => {
  try {
    const res = await axios.get('http://shopping-back-end.minhtriet.dev/api/v1/products/').then(
      (res) => res.data
    )
    return res;
  } catch (error) {
    console.log(error);
  }
};

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  // Fetch data:
  useEffect(() => {
    // Get products:
    const getProducts = async () => {
      const res = await fetchAPI()
      setProducts(res.data.products.slice(0, 10))
    }

    getProducts()
  }, []);

  return (
    <div className="mb-10 mx-4 sm:m-10 2xl:mx-96 bg-[#d0021b] rounded-lg">
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-lg sm:text-2xl text-white font-bold mt-8">SẢN PHẨM KHUYẾN MÃI</h2>
        {/* Box countdown */}
        <CountdownBox />
      </div>
      {/* product list */}
      <div className="mx-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 md:gap-12">
        {products.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <div className='flex justify-center items-center'>
        <button className='flex mb-2 items-center text-sm bg-yellow-400 hover:bg-yellow-300 p-2 rounded-lg'>
          Xem tất cả  SẢN PHẨM KHUYẾN MÃI
        </button>
      </div>
    </div>
  );
};

export default SaleProducts;

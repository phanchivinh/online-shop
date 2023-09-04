import React, { useEffect, useState } from 'react';
import Card from './Card';
import { productData } from '../model/data/mockData';
import CountdownBox from './CountdownBox';
import ProductListSkeleton from './ProductListSkeleton';
import { publicRequest } from '../requestMethod';


const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch data:
  useEffect(() => {
    // Get products:
    const getProducts = async () => {
      try {
        const res = await publicRequest('/v1/products/sales')
        setProducts(res.data.data.products)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    getProducts()
  }, []);

  return (
    <div className="mb-10 mx-4 sm:m-10 2xl:mx-96 bg-[#d0021b] rounded-lg">
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-lg sm:text-2xl text-white font-bold mt-8">SẢN PHẨM KHUYẾN MÃI</h2>
        {/* Box countdown */}
        {/* <CountdownBox /> */}
      </div>
      <ProductListSkeleton loading={isLoading} />

      {
        !isLoading && <div className="mx-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 md:gap-12">
          {products.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      }

      {/* product list */}

      <div className='flex justify-center items-center'>
        <button className='flex my-4 items-center text-sm bg-yellow-400 hover:bg-yellow-300 p-2 rounded-lg'>
          Xem tất cả  SẢN PHẨM KHUYẾN MÃI
        </button>
      </div>
    </div>
  );
};

export default SaleProducts;

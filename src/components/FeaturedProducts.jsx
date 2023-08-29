import React, { useEffect, useState } from 'react';
import Card from './Card';
import { productData } from '../model/data/mockData';
import { publicRequest } from '../requestMethod';
import ProductListSkeleton from './ProductListSkeleton';


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch data:
  useEffect(() => {
    // Get products:
    const getProducts = async () => {
      const res = await publicRequest.get("/v2/products/")
      setProducts(res.data.data.products.slice(0, 10))
      setIsLoading(false)
    }

    getProducts()
  }, []);

  return (
    <div className="mb-10 mx-4 sm:m-10 2xl:mx-96">
      <div className="flex justify-center items-center mb-12">
        <h2 className="text-lg sm:text-2xl font-bold">SẢN PHẨM NỔI BẬT</h2>
      </div>

      <ProductListSkeleton loading={isLoading} />
      {/* product list */}
      {
        !isLoading && <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 md:gap-12">
          {products.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      }


      {/* <div className='flex justify-center items-center'>
        <button className='flex mb-2 items-center text-sm bg-yellow-400 hover:bg-yellow-300 p-2 rounded-lg'>
          Xem tất cả  SẢN PHẨM  NỔI BẬT
        </button>
      </div> */}
    </div>
  );
};

export default FeaturedProducts;

import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import categoryImg from '../assets/image/category.png'
import List from '../components/List'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { AiOutlineClose } from 'react-icons/ai'
import { productData } from '../model/data/mockData'
import Card from '../components/Card'
import axios from 'axios'
import { Pagination, Select, Option } from '@mui/material'
import { publicRequest } from '../requestMethod'
import ProductListSkeleton from '../components/ProductListSkeleton'
const NUMBER_OF_ITEMS = 20

const Products = () => {

  /*-----------------------*/
  const [apiProduct, setApiProduct] = useState([])
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handlePageNumberChange = (event, value) => {
    setCurrentPage(value);
  }

  const categoryAlias = useParams().category
  // const urlCurrentPage = useParams().page

  // useEffect(() => {
  //   setCurrentPage(urlCurrentPage)
  // }, [urlCurrentPage])
  // Fetch data:
  useEffect(() => {
    // Get products:
    const getProducts = async () => {
      try {
        setIsLoading(true)
        const res = await publicRequest.post('/v2/products/category', {
          category_alias_name: categoryAlias
        }).then(res => res.data)
        setProducts(res.data.products)
        setApiProduct(res.data.products)
        setTotalPages(Math.ceil(res.data.products.length / NUMBER_OF_ITEMS))
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }

    }
    getProducts()
  }, [categoryAlias]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * NUMBER_OF_ITEMS;
    const endIndex = startIndex + 20;
    setCurrentProducts(products.slice(startIndex, endIndex))

  }, [currentPage, products])
  /*-----------------------*/

  const [sidebar, setSidebar] = useState(false)
  const category = useParams().category;
  const [sort, setSort] = useState("newest")
  // const [costRange, setCostRange] = useState([])
  const [filters, setFilters] = useState({});

  const showSidebar = () => setSidebar(!sidebar)

  const handleFilters = (event) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value
    })
  }


  useLayoutEffect(() => {
    if (Object.keys(filters).length > 0) {
      const { size, color } = filters
      const filteredProducts = apiProduct.filter(product => {
        const hasDesiredSize = product.product_sizes.some(productSize => productSize.size_name === size);
        const hasDesiredColor = product.product_colors.some(productColor => productColor.color_name === color);
        if (!!size && !!color) {
          return hasDesiredSize && hasDesiredColor;
        }
        return hasDesiredSize || hasDesiredColor
      });
      console.log("filteredProducts", filteredProducts)
      setProducts(filteredProducts)
      setCurrentPage(1)
    }
  }, [filters, apiProduct])

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / NUMBER_OF_ITEMS))
  }, [products])

  return (
    <div className='flex flex-col sm:flex-row'>
      {/* Filter */}
      <div className='flex-1 hidden sm:block sm:py-8 sm:px-8 md:px-12 sm:sticky h-full top-12'>
        {/* Filter item */}
        <div>
          <h2 className='font-bold text-lg'>Kích cỡ:</h2>
          <div className='ml-4 mb-4 grid grid-cols-2'>
            <div>
              <input type='radio' name='size' id='xs' value='XS' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='xs'>XS</label>
            </div>
            <div>
              <input type='radio' name='size' id='s' value='S' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='s'>S</label>
            </div>
            <div>
              <input type='radio' name='size' id='m' value='M' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='m'>M</label>
            </div>
            <div>
              <input type='radio' name='size' id='l' value='L' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='l'>L</label>
            </div>
            <div>
              <input type='radio' name='size' id='xl' value='XL' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='xl'>XL</label>
            </div>
          </div>
        </div>
        {/* Filter item */}
        <div>
          <h2 className='font-bold text-lg'>Màu sắc:</h2>
          <div className='ml-4 mb-4 grid grid-cols-2'>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='trang' value='Trắng' />
              <label className='ml-2 text-sm md:text-base' htmlFor='trang'>Trắng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='xam' value='Xám' />
              <label className='ml-2 text-sm md:text-base' htmlFor='xam'>Xám</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='den' value='Đen' />
              <label className='ml-2 text-sm md:text-base' htmlFor='den'>Đen</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='hong' value='Hồng' />
              <label className='ml-2 text-sm md:text-base' htmlFor='hong'>Hồng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='do' value='Đỏ' />
              <label className='ml-2 text-sm md:text-base' htmlFor='do'>Đỏ</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='be' value='Màu be' />
              <label className='ml-2 text-sm md:text-base' htmlFor='be'>Màu be</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='nau' value='Nâu' />
              <label className='ml-2 text-sm md:text-base' htmlFor='nau'>Nâu</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='vang' value='Vàng' />
              <label className='ml-2 text-sm md:text-base' htmlFor='vang'>Vàng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='xanh-la' value='Xanh lá' />
              <label className='ml-2 text-sm md:text-base' htmlFor='xanh-la'>Xanh lá</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='trang' value='Trắng' />
              <label className='ml-2 text-sm md:text-base' htmlFor='trang'>Trắng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='xanh-lam' value='Xanh lam' />
              <label className='ml-2 text-sm md:text-base' htmlFor='xanh-lam'>Xanh lam</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='tim' value='Tím' />
              <label className='ml-2 text-sm md:text-base' htmlFor='tim'>Tím</label>
            </div>
          </div>
        </div>
        {/* Sort by */}
        <div>
          <h2 className='font-bold text-lg'>Sắp xếp theo:</h2>
          <div className='ml-4 mb-4 grid grid-cols-1 md:grid-cols-2'>
            <div>
              <input defaultChecked="true" type='radio' id='new' name='sort-by' onChange={() => setSort("newest")} />
              <label className='ml-2 text-sm md:text-base' htmlFor='new'>Mới nhất</label>
            </div>
            <div>
              <input type='radio' id='asc' name='sort-by' value='asc' onChange={() => setSort("asc")} />
              <label className='ml-2 text-sm md:text-base' htmlFor='asc'>Giá tăng dần</label>
            </div>
            <div>
              <input type='radio' id='desc' name='sort-by' value='desc' onChange={() => setSort("desc")} />
              <label className='ml-2 text-sm md:text-base' htmlFor='desc'>Giá giảm dần</label>
            </div>
          </div>
        </div>
        {/* Cost Range */}
        {/* <div>
          <Select placeholder='Chọn giá tiền'>
            <Option value= >Dưới 500.000đ</Option>
            <Option value= >Từ 500.000 - 1.000.000đ</Option>
            <Option value= >Từ</Option>
            <Option value= >Dưới 500.000đ</Option>
          </Select>
        </div> */}
      </div>
      <div className='sm:flex-[3] py-8 pr-4'>
        <div className='flex sm:hidden flex-col justify-center items-center py-4 border-2 my-8 mx-8'>
          <div className='flex items-center mb-4' onClick={showSidebar}>
            <TbAdjustmentsHorizontal className='text-2xl cursor-pointer' />
            <p className='ml-2'>Lọc</p>
          </div>
          <div className='flex items-center justify-center w-full'>
            <select name='sort' id='sort' className='block sm:hidden border border-black w-[70%] mb-4 text-black/70 p-1'>
              <option value='new'>Mới nhất</option>
              <option value='asc'>Giá tăng dần</option>
              <option value='desc'>Giá giảm dần</option>
            </select>
          </div>
        </div>

        {/* ----------------------------------Products------------------------------------- */}
        <ProductListSkeleton loading={isLoading} />

        {/* <List category={category} filters={filters} sort={sort} /> */}
        {
          !isLoading && (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-12">
            {currentProducts.map((item) => (
              <Card item={item} key={item.product_id} />
            ))}
          </div>)
        }


        <div className='flex justify-center mt-4'>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageNumberChange} color='primary' />
        </div>
      </div>
    </div>
  )
}

export default Products

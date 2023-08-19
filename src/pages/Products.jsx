import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import categoryImg from '../assets/image/category.png'
import List from '../components/List'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { AiOutlineClose } from 'react-icons/ai'
import { productData } from '../model/data/mockData'
import Card from '../components/Card'
import axios from 'axios'
import { Pagination } from '@mui/material'
const NUMBER_OF_ITEMS = 20

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

const Products = () => {

  /*-----------------------*/
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageNumberChange = (event, value) => {
    setCurrentPage(value);
  }

  const pageNumber = useParams().page
  // Fetch data:
  useEffect(() => {
    // Get products:
    const getProducts = async () => {
      const res = await fetchAPI()
      setProducts(res.data.products)
      setTotalPages(Math.ceil(res.data.products.length / NUMBER_OF_ITEMS))
    }

    getProducts()
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * NUMBER_OF_ITEMS || 0;
    const endIndex = startIndex + 20;
    setCurrentProducts(products.slice(startIndex, endIndex))

  }, [currentPage])
  /*-----------------------*/

  const [sidebar, setSidebar] = useState(false)
  const category = useParams().category;
  const [sort, setSort] = useState("newest")
  const [filters, setFilters] = useState({});

  const showSidebar = () => setSidebar(!sidebar)

  const handleFilters = (event) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value
    })
  }
  return (
    <div className='flex flex-col sm:flex-row'>
      {/* Filter */}
      <div className='flex-1 hidden sm:block sm:py-8 sm:px-8 md:px-12 sm:sticky h-full top-12'>
        {/* Filter item */}
        <div>
          <h2 className='font-bold text-lg'>Kích cỡ:</h2>
          <div className='ml-4 mb-4 grid grid-cols-2'>
            <div>
              <input type='radio' name='size' id='xs' value='xs' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='xs'>XS</label>
            </div>
            <div>
              <input type='radio' name='size' id='s' value='s' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='s'>S</label>
            </div>
            <div>
              <input type='radio' name='size' id='m' value='m' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='m'>M</label>
            </div>
            <div>
              <input type='radio' name='size' id='l' value='l' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='l'>L</label>
            </div>
            <div>
              <input type='radio' name='size' id='xl' value='xl' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='xl'>XL</label>
            </div>
            <div>
              <input type='radio' name='size' id='xxl' value='xxl' onChange={handleFilters} />
              <label className='ml-2 text-sm md:text-base' htmlFor='xxl'>XXL</label>
            </div>
          </div>
        </div>
        {/* Filter item */}
        <div>
          <h2 className='font-bold text-lg'>Màu sắc:</h2>
          <div className='ml-4 mb-4 grid grid-cols-2'>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='trang' value='trang' />
              <label className='ml-2 text-sm md:text-base' htmlFor='trang'>Trắng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='xam' value='xam' />
              <label className='ml-2 text-sm md:text-base' htmlFor='xam'>Xám</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='den' value='den' />
              <label className='ml-2 text-sm md:text-base' htmlFor='den'>Đen</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='hong' value='hong' />
              <label className='ml-2 text-sm md:text-base' htmlFor='hong'>Hồng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='do' value='do' />
              <label className='ml-2 text-sm md:text-base' htmlFor='do'>Đỏ</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='be' value='be' />
              <label className='ml-2 text-sm md:text-base' htmlFor='be'>Màu be</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='nau' value='nau' />
              <label className='ml-2 text-sm md:text-base' htmlFor='nau'>Nâu</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='vang' value='vang' />
              <label className='ml-2 text-sm md:text-base' htmlFor='vang'>Vàng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='xanh-la' value='xanh-la' />
              <label className='ml-2 text-sm md:text-base' htmlFor='xanh-la'>Xanh lá</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='trang' value='trang' />
              <label className='ml-2 text-sm md:text-base' htmlFor='trang'>Trắng</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='xanh-lam' value='xanh-lam' />
              <label className='ml-2 text-sm md:text-base' htmlFor='xanh-lam'>Xanh lam</label>
            </div>
            <div>
              <input onChange={handleFilters} type='radio' name='color' id='tim' value='tim' />
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
      </div>

      {/* Mobile filter */}
      {sidebar && <div className='fixed md:hidden w-screen h-screen top-0 left-0 bg-black/70 z-10' />}
      <div className={`fixed md:hidden z-20 w-[60vw] sm:w-[380px] h-screen bg-white top-0 duration-300 ease-linear ${sidebar ? 'left-0' : 'left-[-110%]'}`}>
        <AiOutlineClose className='absolute text-2xl right-3 top-3 cursor-pointer' onClick={showSidebar} />
      </div>
      {/* Products */}
      <div className='sm:flex-[3] py-8 pr-4'>
        <img className='w-full h-52 object-cover mb-6' src={categoryImg} alt='category' />

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

        {/* <List category={category} filters={filters} sort={sort} /> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-12">
          {currentProducts.map((item) => (
            <Card item={item} key={item.product_id} />
          ))}
        </div>

        <div className='flex justify-center'>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageNumberChange} color='primary' />
        </div>
      </div>
    </div>
  )
}

export default Products

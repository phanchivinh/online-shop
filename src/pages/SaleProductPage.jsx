import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import categoryImg from '../assets/image/category.png'
import List from '../components/List'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { AiOutlineClose } from 'react-icons/ai'
import { productData } from '../model/data/mockData'
import Card from '../components/Card'
import axios from 'axios'
import { Pagination, Select, Option, Slider } from '@mui/material'
import { publicRequest } from '../requestMethod'
import ProductListSkeleton from '../components/ProductListSkeleton'
import { illustrationImg } from '../assets/image'
const NUMBER_OF_ITEMS = 20


function valueText(value) {
  return `${value}`.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  })
}

const SaleProductPage = () => {

  /*-----------------------*/
  const categoryAlias = useParams().category
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNoProduct, setIsNoProduct] = useState(false)

  const [sidebar, setSidebar] = useState(false)
  const [sort, setSort] = useState("newest")

  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    priceRange: [0, 1000000]
  })
  const handlePageNumberChange = (event, value) => {
    setCurrentPage(value);
  }

  /**************************Handle Filter, Sort, Price******************************* */
  const handleCheckboxChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };

      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value)
      } else {
        newFilters[filterType].push(value)
      }
      return newFilters
    })
  }

  const handleSortChange = event => {
    const { value } = event.target;
    setSort(value)
    sortProducts(products, value)
  };

  const sortProducts = (products, sortType) => {
    if (sortType === "newest") {
      const sortedProducts = [...products].sort((a, b) => {
        const dateA = new Date(a.create_date_time)
        const dateB = new Date(b.create_date_time)
        return dateB - dateA //sắp xếp từ ngày gần nhất đến ngày xa nhất
      })
      setProducts(sortedProducts)
      return
    }

    if (sortType === 'asc') {
      const sortedProducts = [...products].sort((a, b) => {
        const aPrice = a.product_discount_price || a.product_price
        const bPrice = b.product_discount_price || b.product_price
        return aPrice - bPrice
      })
      setProducts(sortedProducts)
      return
    }

    if (sortType === 'desc') {
      const sortedProducts = [...products].sort((a, b) => {
        const aPrice = a.product_discount_price || a.product_price
        const bPrice = b.product_discount_price || b.product_price
        return bPrice - aPrice
      })
      setProducts(sortedProducts)
      return
    }
  }

  const handlePriceChange = (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: value
    }))
  }
  /**************************End Handle Filter, Sort, Price******************************* */

  //useEffect for calling API
  useEffect(() => {
    // Get products:
    const getProducts = async () => {
      try {
        setIsLoading(true)
        const res = await publicRequest.get('/v1/products/sales').then(res => res.data)
        if (res.data.products.length === 0) {
          setIsNoProduct(true)
          setIsLoading(false)
          return;
        }
        sortProducts(res.data.products, sort)
        setTotalPages(Math.ceil(res.data.products.length / NUMBER_OF_ITEMS))
        setIsLoading(false)
        setIsNoProduct(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
        setIsNoProduct(true)
      }

    }
    setProducts([])
    getProducts()
  }, [categoryAlias]);

  //Effect for filterproduct
  useEffect(() => {
    const filteredPRDs = products.filter(product => {
      const productPrice = product.product_discount_price || product.product_price
      const [min, max] = filters.priceRange

      const sizePass = filters.sizes.length === 0 || filters.sizes.filter(size => product.product_sizes.some(prdSize => prdSize.size_name === size)).length > 0
      const colorPass = filters.colors.length === 0 || filters.colors.filter(color => product.product_colors.some(prdColor => prdColor.color_name === color)).length > 0
      const pricePass = productPrice >= min && productPrice <= max

      return colorPass && sizePass && pricePass
    })
    setFilteredProducts(filteredPRDs)
    setTotalPages(Math.ceil(filteredPRDs.length / NUMBER_OF_ITEMS))
    setCurrentPage(1)
  }, [filters, products])

  //useE for handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * NUMBER_OF_ITEMS;
    const endIndex = startIndex + 20;
    setCurrentProducts(filteredProducts.slice(startIndex, endIndex))

  }, [currentPage, filteredProducts])

  useEffect(() => {

  }, [sort, filteredProducts])

  /*-----------------------*/


  // const [costRange, setCostRange] = useState([])

  const showSidebar = () => setSidebar(!sidebar)



  useEffect(() => {
    setTotalPages(Math.ceil(products.length / NUMBER_OF_ITEMS))
  }, [products])

  return (
    <div className='flex flex-col sm:flex-row'>
      {/* Filter */}
      <div className='flex-1 hidden sm:block sm:py-8 sm:px-8 md:px-12 sm:sticky h-full top-12'>
        {/* Sort by */}
        <div className='flex'>
          <h2 className='font-bold text-lg mr-4'>Sắp xếp theo:</h2>
          <select className='p-2' value={filters.sort} onChange={handleSortChange}>
            <option value="newest">Mới nhất</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
        {/* Cost Range */}
        <div className='flex flex-col'>
          <h2 className='font-bold text-lg'>Lọc theo giá:</h2>
          <div className='flex'>
            <p className='mr-2'>Từ: {filters.priceRange[0].toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              useGrouping: true,
            }) || "0đ"}</p>
            <p className='ml-4'>đến: {filters.priceRange[1].toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              useGrouping: true,
            })}</p>
          </div>
          <Slider
            getAriaLabel={() => 'Price range'}
            min={0}
            max={1000000}
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay='auto'
            getAriaValueText={valueText}
          />

        </div>

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

        {
          isNoProduct && (<div className='flex flex-col items-center justify-center'>
            <img alt="ilus-noprd" src={illustrationImg.emptyProductList} />
            <p className='text-lg font-bold'>Hiện sản phẩm đang không có hàng. Quý khách vui lòng quay lại sau. Chân thành cảm ơn !!!</p>
          </div>)
        }


        <div className='flex justify-center mt-4'>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageNumberChange} color='primary' />
        </div>
      </div>
    </div>
  )
}

export default SaleProductPage

import React, { useEffect, useState } from 'react'
import { products } from '../assets/image'
import Card from './Card'
import axios from 'axios'

const List = ({ category, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(category ? `http://localhost:5000/api/products?category=${category}` : 'http://localhost:5000/api/products');
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getProducts()
  }, [category]);

  useEffect(() => {
    category && setFilteredProducts(
      products.filter(item => Object.entries(filters).every(([key, value]) => {
        item[key].include(value)
      }))
    )
  }, [products, category, filters])

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else if (sort === 'desc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-12'>
      {
        category ? filteredProducts?.map((item) => (<Card item={item} key={item.id} />))
          : products?.map((item) => (<Card item={item} key={item.id} />))
      }
    </div>
  )
}

export default List



  // const data = [
  //   {
  //     id: 1,
  //     img: products[0],
  //     img2: products[1],
  //     title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - AWAY',
  //     price: 800000,
  //   },
  //   {
  //     id: 2,
  //     img: products[2],
  //     img2: products[3],
  //     title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - HOME',
  //     price: 800000,
  //   },
  //   {
  //     id: 3,
  //     img: products[4],
  //     img2: products[5],
  //     title: 'BỘ QUẦN ÁO BÓNG ĐÁ *ANGLE* - ĐỎ',
  //     price: 900000,
  //   },
  //   {
  //     id: 4,
  //     img: products[6],
  //     img2: products[7],
  //     title: 'VÁY YẾM WORKWEAR - CANVAS XÁ',
  //     price: 500000,
  //   },
  //   {
  //     id: 5,
  //     img: products[8],
  //     img2: products[9],
  //     title: 'ÁO KHOÁC NỮ *ANGLE*',
  //     price: 800000,
  //   },
  //   {
  //     id: 6,
  //     img: products[10],
  //     img2: products[11],
  //     title: 'QUẦN DÀI NỮ *ANGLE*',
  //     price: 600000,
  //   },
  //   {
  //     id: 7,
  //     img: products[12],
  //     img2: products[13],
  //     title: 'ÁO KHOÁC DÙ',
  //     price: 950000,
  //   },
  //   {
  //     id: 8,
  //     img: products[14],
  //     img2: products[15],
  //     title: 'TÚI ĐỰNG GIÀY BÓNG ĐÁ - 5 MÀU',
  //     price: 500000,
  //   },
  // ]

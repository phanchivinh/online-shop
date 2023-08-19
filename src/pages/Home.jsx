import React from 'react'
import Slider from '../components/Slider'
import FeaturedProducts from '../components/FeaturedProducts'
import Category from '../components/Category'
import SaleProducts from '../components/SaleProducts'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Slider />
      <SaleProducts />
      <FeaturedProducts />
      <Category />
      <NewsLetter />
    </div>
  )
}

export default Home

import React from 'react'
import Slider from '../components/Slider'
import FeaturedProducts from '../components/FeaturedProducts'
import Category from '../components/Category'
import SaleProducts from '../components/SaleProducts'

const Home = () => {
  return (
    <div>
      <Slider />
      <SaleProducts />
      <FeaturedProducts />
      <Category />
    </div>
  )
}

export default Home

import React from 'react'
import Slider from '../components/Slider'
import FeaturedProducts from '../components/FeaturedProducts'
import Category from '../components/Category'

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <Category />
    </div>
  )
}

export default Home
import React, { useState, useEffect, useCallback } from 'react'
import { sliderImages } from '../assets/image'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderImages.length - 1 : (prev) => prev - 1)
  }

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === sliderImages.length - 1 ? 0 : (prev) => prev + 1)
  }, [currentSlide])

  useEffect(() => {
    const timerId = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => {
      clearInterval(timerId)
    }
  }, [nextSlide])



  return (
    <div className='h-screen w-full relative overflow-hidden'>
      {/* Container */}
      <div className='w-[300vw] h-screen flex' style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {sliderImages.map((img, index) => (
          <Link to='products/men/1'>
            <img
              src={img}
              alt='home'
              key={`home ${index}`}
              className='w-screen h-[80%] object-cover transition-all duration-500 ease'
              style={{ opacity: `${currentSlide === index ? '1' : '0'}` }}
            />
          </Link>
        ))}
      </div>
      {/* Icon */}
      <div
        className='absolute hidden sm:flex left-3 top-0 bottom-0 m-auto w-14 h-14 justify-center items-center text-6xl text-white/60 hover:text-white cursor-pointer'
        onClick={prevSlide}
      >
        <TfiAngleLeft />
      </div>
      <div
        className='absolute hidden sm:flex right-3 top-0 bottom-0 m-auto  w-14 h-14 justify-center items-center text-6xl text-white/60 hover:text-white cursor-pointer'
        onClick={nextSlide}
      >
        <TfiAngleRight />
      </div>

    </div>
  )
}

export default Slider

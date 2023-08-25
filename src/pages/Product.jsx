import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethod'
import { addProduct } from '../redux/cartRedux'
import { productDetail } from '../model/data/mockData';

const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImg, setSelectedImg] = useState(0)
  const [imageList, setImageList] = useState([])
  const [colorList, setColorList] = useState([])
  const [sizeList, setSizeList] = useState([])
  const [product, setProduct] = useState({})
  const [stockAmount, setStockAmount] = useState(0)
  const [productDetails, setProductDetails] = useState([])
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [addCartMessage, setAddCartMessage] = useState("")
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2]

  /******************** */
  useEffect(() => {
    const getProduct = async () => {
      try {
        // const resData = await publicRequest.get("products/detail/" + id).then(res => res.data)
        // debugger
        // setProduct(resData.data.product)
        const productDetails = productDetail
        // setColorList(["#0000FF"])
        setImageList(productDetails.images)
        setProductDetails(productDetails.products)
        setProduct(productDetails.products[0])
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  }, [id])

  useEffect(() => {
    const uniqueColors = Array.from(
      new Set(productDetails.map(variant => variant.color_code))
    );

    setColorList(uniqueColors);
  }, [productDetails]);

  useEffect(() => {
    const filteredDetails = productDetails.filter(detail => {
      return detail.color_code === colorList[selectedColor]
    })
    let sizes = []
    filteredDetails.forEach(detail => {
      sizes.push(detail.size_name)
    })
    setSizeList(sizes)
  }, [colorList, selectedColor, productDetails])

  const handleCartAdd = () => {
    if (selectedColor < 0 || selectedSize === '') {
      setAddCartMessage("* Vui lòng chọn size hoặc kích cỡ sản phẩm")
      return
    }

    const selectedProduct = productDetails.find(detail => {
      return (detail.color_code === colorList[selectedColor] && detail.size_name === selectedSize)
    })
    dispatch(addProduct({ product: selectedProduct, quantity, price: selectedProduct.product_price, image: imageList[0] })) //color, size
    // const res =
  }

  useEffect(() => {
    const filteredDetail = productDetails.filter(detail => {
      return (detail.color_code === colorList[selectedColor] && detail.size_name === selectedSize)
    })
    setStockAmount(filteredDetail[0]?.stock_amount || 0)
  }, [selectedSize, colorList, productDetails, selectedColor])

  /******************** */
  return (
    <div className='flex flex-col sm:flex-row py-5 px-5 md:px-12 gap-5 md:gap-12'>
      {/* Left */}
      <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3 md:gap-5'>
        {/* Item images */}
        <div className='flex-1 flex flex-row sm:flex-col sm:overflow-y-scroll gap-1'>
          {
            imageList.map((image, index) => (
              <img key={`product-image-${index}`} className={`w-auto sm:w-full h-28 mb-1 object-cover cursor-pointer border-black duration-200 hover:scale-110 ${selectedImg === index ? 'border opacity-100' : 'opacity-60 border-none'}`} src={image} alt={`product-${index}`} onClick={() => setSelectedImg(index)} />
            ))
          }
        </div>
        {/* Main image */}
        <div className='flex-[5]'>
          <img className='w-full max-h-[800px] object-cover' src={imageList[selectedImg]} alt="view-product" />
        </div>
      </div>
      {/* Right */}
      <div className='flex-1 flex flex-col'>
        <h1 className='text-2xl md:text-3xl font-bold'>{product.product_name}</h1>
        <div className='w-10 h-2 my-2 border-b-4 border-b-blue-300' />
        <span className='text-xl text-red-600 md:text-2xl'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product_price)}</span>
        <p className='pt-10 pb-8 text-lg md:text-xl'>Chi tiết: {product.product_description}</p>
        {/* Colors */}
        <div className='flex mb-2'>
          {
            colorList.map((color, index) => <div key={`color-${index}`} onClick={() => setSelectedColor(index)} style={{ backgroundColor: color }} className={`w-6 h-6 mr-5 rounded-full ${selectedColor === index ? 'border border-2 border-black' : 'border-none'}`}></div>)
          }
        </div>
        {/* Quantity */}
        <div className='flex gap-5 mb-4'>
          <h2 className='text-xl font-semibold'>Số lượng:</h2>
          <button className='border border-black px-3 font-bold hover:bg-blue-200' onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
          {quantity}
          <button className='border border-black px-3 font-bold hover:bg-blue-200' onClick={() => setQuantity(prev => prev + 1)}>+</button>
        </div>
        {/* Size options */}
        <div className='flex gap-4 mb-4'>
          <h2 className='text-xl font-semibold'>Kích cỡ:</h2>
          <select className='border border-black rounded-md bg-blue-200 w-56' onChange={(event => setSelectedSize(event.target.value))}>
            <option>Chọn một tùy chọn</option>
            {
              sizeList.map(size => <option key={`option-${size}`} value={size}>{size}</option>)
            }
          </select>
        </div>
        <div className='mb-10'>
          {stockAmount > 0 && (<span>Còn lại: {stockAmount}</span>)}
        </div>
        <p className='mb-2 text-red-600'>{addCartMessage}</p>
        <button onClick={handleCartAdd} className='flex gap-4 items-center justify-center p-3 text-white font-bold w-full bg-blue-500 cursor-pointer hover:bg-blue-600'>
          <BsCartPlus /> THÊM VÀO GIỎ HÀNG
        </button>
      </div>
    </div>
  )
}

export default Product

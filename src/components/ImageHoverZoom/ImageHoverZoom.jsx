import React from 'react'
import './ImageHoverZoom.css'

const ImageHoverZoom = ({ imgPath }) => {
  return (
    <div className="img-wrapper">
      <img src={imgPath} alt="view-product" className="hover-zoom" />
    </div>
  )
}

export default ImageHoverZoom

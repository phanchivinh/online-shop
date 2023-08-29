import { Skeleton } from '@mui/material'
import React from 'react'

const ProductListSkeleton = ({ loading }) => {

  const items = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <>
      {
        loading &&
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-12 p-2 '>
          {
            items.map(item => (
              <div key={`skeleton-${item}`} className='w-full p-2 bg-white/80 rounded-lg'>
                <div>
                  <Skeleton variant='rectangular' height={200} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>

                <div className='mt-5 mb-2 flex justify-center'>
                  <Skeleton variant='rectangular' width={100} height={30} />
                </div>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}

export default ProductListSkeleton

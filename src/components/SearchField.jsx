import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineShop } from 'react-icons/ai'
import { searchResult } from '../model/data/mockData';
import { publicRequest } from '../requestMethod';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

const SearchField = () => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(false)
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setSearch("")
  }

  const debouncedSearchData = debounce(async (query) => {
    try {
      const response = await publicRequest('searches/products', {
        search_pattern: query
      })
      setResult(response.data.data.products);
    } catch (error) {
      console.error(error)
    }
  }, 300)

  const handleChange = (value) => {
    setSearch(value)
  }

  const handleSearch = async () => {
    if (search.trim() === '') {
      setError(true)
      return
    };

    setLoading(true);

    try {
      const response = await publicRequest.post('/v1/searches/products', {
        search_pattern: search
      });
      setResult(response.data.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  //Clean up on Unmount
  useEffect(() => {
    return () => {
      debouncedSearchData.cancel()
    }
  }, [])

  //Trigger search when user has stopped inputting
  useEffect(() => {
    if (search.trim() !== '') {
      debouncedSearchData(search)
    }
  }, [search])

  return (
    <div className='relative'>
      <div className={`hidden md:flex border-2 ${error ? 'border-red-600' : 'border-blue-300'} rounded-md overflow-hidden relative`}>
        <input type='text' placeholder='Tìm kiếm...' value={search} className='outline-none px-1 border-r-2 border-r-blue-300' onChange={event => handleChange(event.target.value)} />
        <button className={`w-full h-full p-2 text-2xl hover:bg-blue-500 hover:text-white duration-150 cursor-pointer disabled:cursor-not-allowed`} disabled={loading} onClick={handleSearch}><BsSearch /></button>
      </div>
      {error && <p className='text-red-600'>* Vui lòng nhập tên sản phẩm</p>}

      {
        search && <div className='w-96 h-96 bg-white absolute border rounded-md border-black overflow-scroll z-50'>
          <div className='mx-2 flex items-center border-b border-blue-500 w-full'>
            <span className='font-bold text-red-500 flex items-center mr-2'><AiOutlineShop className='text-xl mr-1' /> Tìm kiếm: </span> {search}
          </div>
          <div className='mx-2 mt-2 w-full h-full flex flex-col '>
            {
              result.map(item => <Link onClick={handleClick} key={`product/${item.product_id}`} to={`/product/${item.product_id}`} className='text-sm cursor-pointer mb-2 hover:font-bold'>{item.product_name}</Link>)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default SearchField

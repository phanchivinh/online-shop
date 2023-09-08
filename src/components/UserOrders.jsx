import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { publicRequest } from '../requestMethod';
import { apiUserOrders } from '../model/data/mockData';
import { formatVND } from '../helpers';


const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.auth.accessToken)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await publicRequest.get('/v1/orders/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data)
        // const response = apiUserOrders
        setOrders(response.data.orders)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [accessToken])


  return (
    <div className=''>
      {
        orders.length === 0 ? (
          <div className='p-4 bg-blue-200'>
            <div className='p-2 bg-white'>
              Bạn chưa đặt mua sản phẩm nào
            </div>
          </div>
        )
          :
          <div className='border border-blue-600  rounded-md'>
            {
              orders.map((order, index) => (
                <div className='flex border border-b-blue-600 p-2 hover:bg-gray-300'>
                  <div className='flex-[2]'>
                    <div>
                      <label className='mr-2 font-bold'>ID:</label>
                      <span>{order.order_id}</span>
                    </div>
                    <div>
                      <label className='mr-2 font-bold'>Địa chỉ nhận hàng:</label>
                      <span>{order.user_address}</span>
                    </div>
                    <div>
                      <label className='mr-2 font-bold'>Ngày đặt hàng:</label>
                      <span>{order.order_date}</span>
                    </div>
                    <div>
                      <label className='mr-2 font-bold'>Hình thức thanh toán:</label>
                      <span>{order.payment_type}</span>
                    </div>
                  </div>
                  <div className='flex-1 flex justify-center items-center'>
                    <span>{formatVND(order.order_total_price)}</span>
                  </div>
                  <div className='flex-1 flex justify-center items-center'>
                    <span>{order.order_status}</span>
                  </div>
                </div>
              ))
            }
          </div>

      }
    </div>
  )
}

export default UserOrders

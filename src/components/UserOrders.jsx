import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { publicRequest } from '../requestMethod';
import { apiUserOrders } from '../model/data/mockData';


const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.auth.accessToken)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await publicRequest.post('/v1/management/orders/', {
          order_status: 0,  //get all
          order_id: null    //get all
        }, {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data)
        // const response = apiUserOrders
        console.log(response.data.orders)
        debugger
        setOrders(response.data.orders)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [accessToken])

  const columns = [
    { field: "order_id", headerName: "Mã đơn hàng", width: 100 },
    { field: "create_date", headerName: "Ngày đặt", width: 150 },
    {
      field: "order_total_price",
      headerName: "Thành tiền",
      width: 150
    },
    {
      field: "order_status_name",
      headerName: "Trạng thái thanh toán",
      width: 150,
      renderCell: (params) => {
        <>
          <Button type={params.row.order_status_name} />
        </>
      }
    },
    {
      field: "payment_type_name",
      headerName: "Hình thức thanh toán",
      width: 150,
    },
  ];

  const Button = ({ type }) => {
    return <button className={`py-1 px-2 rounded-lg cursor-auto
    ${type === 'Hoàn thành' && 'bg-[#e5faf2] text-[#3bb077]'}
    ${type === 'Đã thanh toán' && 'bg-[#e5faf2] text-[#3bb077]'}
    ${type === 'Đã hủy' && 'bg-[#fff0f1] text-[#d95087]'}
    ${type === 'Đang giao' && 'bg-[#ebf1fe] text-[#2a7ade]'}
    ${type === 'Chờ thanh toán' && 'bg-[#ebf1fe] text-[#2a7ade]'}
    ${type === 'Vận chuyển' && 'bg-[#ebf1fe] text-[#2a7ade]'}
    `}>{type}</button>
  }

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

          <DataGrid
            rows={orders}
            autoHeight
            // disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.order_id}
            autoPageSize
          // checkboxSelection
          />
      }
    </div>
  )
}

export default UserOrders

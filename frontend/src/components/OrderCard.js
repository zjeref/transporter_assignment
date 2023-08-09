import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderCard = ({orderData, currentUserRole}) => {

  const navigate = useNavigate();

  const openChat= ()=> {
    navigate(`/chat/${orderData._id}`)
  }
  
  return (
    <div className='w-64 border-2 border-primary text-blackk p-2 space-y-2 mb-10'>
        <p className='text-primary font-bold text-xl text-center mb-2'>{currentUserRole==="Transporter"? orderData.manufacturer.name: orderData.transporter.name}</p>
        <p>From: <span className='font-bold text-primary'>{orderData.from}</span></p>
        <p>To: <span className='font-bold text-primary'>{orderData.to}</span></p>
        <p>Qauntity:  <span className='font-bold text-primary'>{orderData.quantity}</span></p>
        <p>Status: <span className='font-bold text-primary'>Ongoing</span></p>
        <button className='px-3 py-1 text-white text-sm rounded-md bg-secondary border-2 border-blackk' onClick={()=> openChat()}>Open Chat</button>
    </div>
  )
}

export default OrderCard
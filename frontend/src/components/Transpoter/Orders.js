import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import Cookies from "js-cookie";

const Orders = () => {
  const [allOrders, setAllOrders] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/getOrderByUserId`, {
        headers,
      })
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.error(err));
  },[]);

  return (
    <div className="w-full max-w-6xl flex flex-col items-center justify-center p-2 my-20">
      <h1 className="text-3xl font-bold text-blackk mb-10">Your Orders</h1>
      <div className="flex justify-center flex-wrap space-x-10">
        {allOrders ? (
          allOrders.map((order) => {
            return <OrderCard orderData={order} />;
          })
        ) : (
          <h1>No Orders has been Booked</h1>
        )}
      </div>
    </div>
  );
};

export default Orders;

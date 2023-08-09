import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../middlewares/global-states";

import Cookies from "js-cookie";
import axios from "axios";

const OrderModal = () => {
  const { data, dispatch } = useContext(GlobalState);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState("");
  const [manufacturer, setManufacturer] = useState(null);
  const [transporter, setTranspoter] = useState(1);
  const [allTransporters, setAllTransporters] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/allTransporters`)
      .then((res) => setAllTransporters(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setManufacturer(data.loggedUser._id);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/orders/create`,
        { from, to, address, manufacturer, quantity, transporter },
        { headers }
      )
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: "FIRE_MODAL", payload: "" });
        // navigate('/')
      })
      .catch((err) => alert(err.message));

    setIsLoading(false);
  };

  const closeModal = (e) => {
    e.preventDefault();
    dispatch({ type: "FIRE_MODAL", payload: "" });
  };

  return (
    <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
      <div className="w-1/2">
        <form
          onSubmit={handleSubmit}
          className="p-8 h-full flex flex-col justify-between"
        >
          <h1 className="text-3xl font-bold mb-4 border-b-blackk border-b-2">
            Book at your place
          </h1>
          <div className="space-y-3">
            <div className="">
              <label htmlFor="from" className="flex flex-col mb-2">
                <span className="">From</span>
                <input
                  type="text"
                  id="from"
                  className="input-form"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </label>
              <label htmlFor="to" className="flex flex-col">
                <span className="">To</span>
                <input
                  type="text"
                  id="to"
                  className="input-form"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </label>
              <label htmlFor="Qauntity" className="flex flex-col">
                <span className="">Qauntity</span>
                <input
                  type="number"
                  id="Qauntity"
                  className="input-form"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
              <label htmlFor="address" className="flex flex-col">
                <span className="">Address</span>
                <input
                  type="text"
                  id="Address"
                  className="input-form"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <label htmlFor="transpoter" className="flex flex-col">
                <span className="">Transporter</span>
                <select
                  name="transpoter"
                  id="transpoter"
                  className="input-form"
                  defaultValue="None"
                  onChange={(e) => setTranspoter(e.target.value)}
                >
                  {allTransporters &&
                    allTransporters.map((transporter) => {
                      return (
                        <option key={transporter.email} value={transporter._id}>
                          {transporter.name}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="cancel"
              className="px-8 py-2 border-[1px] border-slate-500 rounded-md text-sm text-slate-500 font-semibold"
              onClick={(e) => closeModal(e)}
            >
              Back
            </button>
            <button
              type="submit"
              className={`btn font-semibold bg-secondary ${
                isLoading ? "opacity-60" : ""
              }`}
              disabled={isLoading}
            >
              {!isLoading ? "Book" : "Booking..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;

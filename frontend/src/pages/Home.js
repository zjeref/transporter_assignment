import React, { useContext, useEffect, useState } from "react";
import UserSignup from "../components/User/Signup";
import { GlobalState } from "../middlewares/global-states";
import UserLogin from "../components/User/Login";
import Hero from "../components/User/Hero";
import BookingModal from "../components/User/OrderModal"
import Navbar from "../components/Navbar";

const Home = () => {
  const { data } = useContext(GlobalState);
  const [states, setStates] = useState(null);
  useEffect(() => {
    setStates(data);
  }, [data]);

  return (
    <>
      <Navbar userData={data.loggedUser} />
      {states && states.activeModal === "SIGNUP" ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full flex flex-col items-center">
            <UserSignup />
          </div>
        </div>
      ) : null}
      {states && states.activeModal === "LOGIN" ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full flex flex-col items-center">
            <UserLogin />
          </div>
        </div>
      ) : null}
      {states && states.activeModal === "BOOKING" ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full flex flex-col items-center">
            <BookingModal />
          </div>
        </div>
      ) : null}
      <div className="w-full flex flex-col items-center">
        <div className="relative">
          <Hero />
        </div>
      </div>
    </>
  );
};

export default Home;

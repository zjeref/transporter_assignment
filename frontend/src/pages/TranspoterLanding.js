import React, { useContext, useEffect, useState } from "react";
import UserSignup from "../components/User/Signup";
import { GlobalState } from "../middlewares/global-states";
import TranspoterLogin from "../components/Transpoter/Login";
import TranspoterSignup from "../components/Transpoter/Signup";
import Hero from "../components/Transpoter/Hero";
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
            <TranspoterSignup />
          </div>
        </div>
      ) : null}
      {states && states.activeModal === "LOGIN" ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full flex flex-col items-center">
            <TranspoterLogin />
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

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/driver.png";
import Cookies from "js-cookie";
import { GlobalState } from "../middlewares/global-states";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(GlobalState);

  const navigate = useNavigate();
  useEffect(() => {
    setCurrentUser(data.loggedUser);
  }, [data.loggedUser]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const pageSwitch = () => {
    if (currentUser.role === "transporter") {
      navigate("/");
    } else {
      navigate("/transLanding");
    }
  };

  const Logout = () => {
    Cookies.remove("authToken");
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="max-w-6xl w-full p-2 flex justify-between my-2">
        <img src={logo} alt="logo" className="cursor-pointer w-12 h-12" />

        <div className="flex space-x-10 text-blackk font-sans text-lg ">
          <p className="navbarMenu">HOME</p>

          <p className="navbarMenu" onClick={() => pageSwitch()}>
            {currentUser || currentUser?.role === "Manufacturer"
              ? "SWITCH TO TRANSPOTER"
              : "SWITCH TO MANUFACTURER"}
          </p>
          {currentUser && currentUser.name ? (
            <>
              <p className="navbarMenu">BOOKINGS</p>
              <div onClick={() => toggleModal()} className="relative z-50">
                <p className="navbarMenu">{currentUser.name?.toUpperCase()}</p>
                {isModalOpen ? (
                  <div className="absolute bg-white">
                    <p className="navbarMenu">Profile</p>
                    <p className="navbarMenu" onClick={() => Logout()}>
                      Logout
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              <p className="navbarMenu">CONTACT</p>
              <p className="navbarMenu">PROFILE</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

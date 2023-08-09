import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../middlewares/global-states";
import Navbar from "../components/Navbar";
import Orders from "../components/Orders";

const Home = () => {
  const { data } = useContext(GlobalState);
  const [states, setStates] = useState(null);
  useEffect(() => {
    setStates(data);
  }, [data]);

  return (
    <>
      <Navbar userData={data.loggedUser} />
      <div className="w-full flex justify-center">
        <div className="relative">
          <Orders currentUserRole={"Transporter"}/>
        </div>
      </div>
    </>
  );
};

export default Home;

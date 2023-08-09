import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../middlewares/global-states";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Chat = () => {
  const { data, dispatch } = useContext(GlobalState);
  const params = useParams();
  const [socket, setSocket] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  const roomId = params.id;

  useEffect(() => {
    setCurrentUser(data.loggedUser);
  }, [data.loggedUser]);

  useEffect(() => {
    if (roomId) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/orders/getOrderById`, {
          roomId,
        })
        .then((res) => setCurrentOrder(res.data))
        .catch((error) => console.log(error));
      axios
        .post(`${process.env.REACT_APP_API_URL}/messages/all`, { roomId })
        .then((res) => setAllMessages(res.data))
        .catch((error) => console.log(error));
    }
  }, [roomId]);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:4000"); // Connect to the server
  //   setSocket(newSocket);
  //   // Join the appropriate room based on the orderID
  //   newSocket.emit("joinRoom", roomId);

  //   // Listen for chat messages from the server
  //   newSocket.on("chat", (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //     console.log(data)
  //   });

  //   newSocket.on("connect", () => {
  //     console.log("Socket connected:", newSocket.id);
  //   });

  //   return () => {
  //     newSocket.disconnect(); // Disconnect when the component unmounts
  //   };
  // }, [roomId]);

  const sendMessage = async() => {
      let chatData;
      console.log(currentUser)
      if (currentUser.role === "Transporter") {
        chatData = {
          order: roomId,
          sender: currentUser._id,
          reciever: currentOrder.manufacturer._id,
          content: message,
        };
      } else {
        chatData = {
          order: roomId,
          sender: currentUser._id,
          reciever: currentOrder.transporter._id,
          content: message,
        };
      }
      console.log(chatData);
      await axios.post(`${process.env.REACT_APP_API_URL}/messages/add`, {chatData})
      .then((res)=> setAllMessages([...allMessages],res.data))
      .catch(err => console.log(err))
      // socket.emit("chat", chatData);
      setMessage("");
  };

  return (
    <div>
      <Navbar userData={data.loggedUser} />
      {currentUser && currentOrder && (
        <div className="w-full flex flex-col items-center">
          <div className="relative border-2 border-blackk px-2 py-4">
            <h1 className="text-2xl text-blackk font-bold capitalize text-center mb-4 border-b-2 border-blackk">
              {currentUser.role === "Transporter"
                ? currentOrder.manufacturer.name
                : currentOrder.transporter.name}
            </h1>
            <div className="h-80 w-96">
              {allMessages.map((message) => {
                return (
                  <p
                    className={`${
                      message.sender === currentUser._id ? "text-end " : ""
                    } my-2` }
                  >
                    <span className="px-2 py-1 bg-slate-300 rounded-md">{message.content}</span>
                    
                  </p>
                );
              })}
            </div>
            <div className="w-full flex justify-between border-t-2 border-blackk p-2">
              <input className="input-form" type="text" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="Enter a Message" />
              <button className="px-2 bg-secondary text-white rounded-md py-1 border-2 border-blackk" onClick={() => sendMessage()}>Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

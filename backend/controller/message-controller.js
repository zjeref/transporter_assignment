require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Message = require("../model/Message");

// `${process.env.REACT_APP_API_URL}/messages/${orderId}`, {orderId}
exports.getMessageById = asyncHandler(async (req, res) => {
  const orderId = req.body.roomId;
  const allMessages = await Message.find({ order: orderId });
  res.status(200).json(allMessages);
});

exports.addMessage = asyncHandler(async (req, res) => {
  const { chatData } = req.body;
  const newMessage = new Message({
    order: chatData.order,
    sender: chatData.sender,
    receiver: chatData.reciever,
    content: chatData.content,
  });
  await newMessage.save();

  res.status(200).json(newMessage);
});

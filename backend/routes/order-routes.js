const express = require("express");
const Router = express.Router();
const { userAuth } = require("../middlwares/userAuth");
const {
  createOrder,
  deleteOrder,
  getOrderbyManufacturerId,
  getOrderbyTransporterId,
  getOrderById
} = require("../controller/order-controller");

Router.post("/create", userAuth, createOrder);
Router.delete("/delete", userAuth, deleteOrder);
Router.post("/getOrderbyId",  getOrderById);
Router.get("/getOrderbyManufacturerId", userAuth, getOrderbyManufacturerId);
Router.get("/getOrderbyTransporterId", userAuth, getOrderbyTransporterId)

module.exports = Router;

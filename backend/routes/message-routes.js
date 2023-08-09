const express = require("express");
const Router = express.Router();
const { userAuth } = require("../middlwares/userAuth");
const {
  getMessageById,
  addMessage,
} = require("../controller/message-controller");

Router.post("/all", getMessageById);
Router.post("/add", addMessage);

module.exports = Router;

require('dotenv').config();
const asyncHandler = require('express-async-handler');
const Order = require('../model/Order');

exports.createOrder = asyncHandler(async (req, res)=> {
    const {from, to, quantity, address, manufacturer, transporter} = req.body;
    console.log(from, to, quantity, address, manufacturer, transporter);
    const newOrder  = new Order({
        from: from,
        to: to,
        quantity: quantity,
        pickupAddress: address,
        manufacturer: manufacturer,
        transporter: transporter
    });
    await newOrder.save();
    res.status(200).json(newOrder);
})

exports.deleteOrder = asyncHandler(async (req, res)=> {
    const {orderId} = req.body;
    const {user} = req.user;
    const deleteOrder = await Order.findByIdAndDelete(orderId);
    res.status(200).json({
        message:"Order deleted successfully"
    });
})

exports.getOrderbyId = asyncHandler(async (req, res)=> {
    const {orderId} = req.body;
    const order = await Order.findById(orderId)
    res.status(200).json(order);
})

exports.getOrderbyManufacturerId = asyncHandler(async (req, res)=> {
    const userId = req.user._id
    const allOrders = await Order.find({manufacturer:userId}).populate("transporter");
    res.status(200).json(allOrders);
});

exports.getOrderbyTransporterId = asyncHandler(async (req, res)=> {
    const userId = req.user._id
    const allOrders = await Order.find({transporter:userId}).populate("manufacturer");
    res.status(200).json(allOrders);
});

exports.getOrderById = asyncHandler(async (req, res)=> {
    const {roomId} = req.body;
    const orders = await Order.findById(roomId).populate("manufacturer transporter");
    res.status(200).json(orders);
});


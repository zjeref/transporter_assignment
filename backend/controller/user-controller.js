require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User')


exports.createAccount = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res.status(409).json({ error: 'Already exist' })
    }

    const encry_password = bcrypt.hashSync(password)

    const newUser = new User({
        name: name,
        email: email,
        password: encry_password,
        role: role
    })
    await newUser.save()

    //TODO token
    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role:role,
        token: generateToken(newUser._id)
    })
})

exports.verifyAccount = asyncHandler(async (req, res) => {
    const {  email, password } = req.body
    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(404).json({ message: "Account doesn't exist" })
    }

    if (bcrypt.compare(password, existingUser.password)) {
        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            role: existingUser.role,
            email: existingUser.email,
            token: generateToken(existingUser._id)
        })
    }
    else {
        res.status(401).json({ message: "Password does not match" })
    }
})

exports.getAccount = asyncHandler(async (req, res) => {
    const {id }= req.params;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: "User does not exist" })

    res.status(200).json(user);
})

exports.getMe = asyncHandler(async (req, res) => {
    res.send(req.user);
})

exports.getAllTransporters = asyncHandler(async (req, res) => {
    const allTransporters = await User.find({role:"Transporter"}).select('-password')
    res.status(200).json(allTransporters)
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}




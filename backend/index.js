require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  },
  autoConnect: false
});


const userRoutes = require("./routes/user-routes");
const orderRoutes = require("./routes/order-routes");
const messageRoutes = require("./routes/message-routes");


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/delhivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error("DB CONNECTION ERROR:", err);
  });

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);

// Socket.io code
// io.on("connection", (socket) => {
//   console.log("dsadada")
//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//   });

//   socket.on("chat", async (data) => {
//     const Message = require("./models/message"); // Import your message model

//     const newMessage = new Message({
//       order: data.order,
//       sender: data.sender,
//       reciever: data.reciever,
//       content: data.content,
//     });

//     try {
//       await newMessage.save(); // Save the message to the database
//       io.to(data.order).emit("chat", newMessage);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });
// });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

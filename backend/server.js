const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT;
const server = app.listen(PORT, console.log("server running..."));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});

//create connection
io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    // create new room with the user id
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    // create new room with the particular user to join a chat
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined Room: "+ room);
    });

    // create room for typing and stop typing
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    // send message
    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        chat.users.forEach((user) => {
            if(user._id == newMessageReceived.sender._id) return;
            //sending the message to the created room
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    //cleanup the socket
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });

})
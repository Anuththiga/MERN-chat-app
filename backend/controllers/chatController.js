const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const createChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    // check if the chat exists
    var isChat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
    .populate("latestMessage");

    // get sender from message model
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name image email",
    });

    if(isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        // if chat not found create new chat
        var chatData = {
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId],
        };

        try {
            //store the chatData in DB
            const createdChat = await Chat.create(chatData);

            //send this createdchat to user
            const fullChat = await Chat.findOne({ _id: createChat._id })
                                        .populate("users", "-password");
            
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }

});

const fetchAllChats = asyncHandler(async (req, res) => {
    try {
      //find all the chats related with this userId
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } }})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name image email",
            });

            res.status(200).send(results);

        });  
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
    
})

module.exports = { createChat, fetchAllChats };
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
    
});

const createGroupChat = asyncHandler(async (req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the fields" });
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2) {
        return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    //push the loggedIn user as well
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroup: true,
            users: users,
            groupAdmin: req.user,
        });

        //fetch the group chat from DB and send that back to api

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
                                    .populate("users", "-password")
                                    .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroupChat = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId }
        },
        {
            new: true,
        }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId }
        },
        {
            new: true,
        }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
})

module.exports = { createChat, fetchAllChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup };
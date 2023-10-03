const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createChat, fetchAllChats, createGroupChat } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, createChat);
router.route("/").get(protect, fetchAllChats);
router.route("/group").post(protect, createGroupChat);

module.exports = router;
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createChat, fetchAllChats } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, createChat);
router.route("/").get(protect, fetchAllChats);

module.exports = router;
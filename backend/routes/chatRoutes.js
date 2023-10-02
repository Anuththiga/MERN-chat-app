const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createChat } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, createChat);

module.exports = router;
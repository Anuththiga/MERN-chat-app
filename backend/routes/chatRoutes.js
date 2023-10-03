const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createChat, fetchAllChats, createGroupChat, renameGroupChat, addToGroup } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, createChat);
router.route("/").get(protect, fetchAllChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroupChat);
router.route("/add").put(protect, addToGroup);

module.exports = router;
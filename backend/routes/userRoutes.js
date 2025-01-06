const express = require("express");
const router = express.Router();
const { registerUser, getUserInfo } = require("../controllers/userController");

router.post("/register", registerUser);
router.get("/info/:userAddress", getUserInfo);

module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyProofLocally } = require("../controllers/zkProofController");

router.post("/verify", verifyProofLocally);

module.exports = router;

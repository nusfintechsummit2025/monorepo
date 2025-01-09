const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  uploadData,
  purchaseDataAccess,
  distributeRewards,
  processFile
} = require("../controllers/dataController");

// Multer for file uploads (in-memory):
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("healthData"), uploadData);
router.post("/purchase", purchaseDataAccess);
router.post("/rewards", distributeRewards);
router.post("/process", processFile);

module.exports = router;

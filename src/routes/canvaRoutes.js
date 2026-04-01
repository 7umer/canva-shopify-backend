const express = require("express");
const router = express.Router();

const {
  redirectToCanva,
  handleCallback,
  exportDesign,
} = require("../controllers/canvaController");

// STEP 1: Connect to Canva (OAuth)
router.get("/connect", redirectToCanva);

// STEP 2: Canva OAuth callback
router.get("/oauth/callback", handleCallback);

router.get("/export", exportDesign);

module.exports = router;
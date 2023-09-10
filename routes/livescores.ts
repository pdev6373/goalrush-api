import express from "express";
const router = express.Router();
const liveScores = require("../controllers/livescores");

router.route("/").get(liveScores);

module.exports = router;

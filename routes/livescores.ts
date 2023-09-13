import express from "express";
const router = express.Router();
const liveScores = require("../controllers/livescores");

// router.route("/").get(liveScores);
router.ws("/", (ws, req) => {
  ws.on("open", (msg: any) => {
    console.log("Hello");

    ws.send(msg);
  });
});

module.exports = router;

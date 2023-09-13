import express from "express";
const router = express.Router();
import { getLivescores } from "../controllers/livescores";

// router.route("/").get(liveScores);
router.ws("/", (ws, req) => {
  ws.on("message", () => {
    setInterval(async () => {
      const livescores = await getLivescores();
      ws.send(JSON.stringify(livescores));
    }, 60000);
  });
});

module.exports = router;

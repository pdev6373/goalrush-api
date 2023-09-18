import express from "express";
const router = express.Router();
import { getLivescores, getScoresByDate } from "../controllers/livescores";

router.ws("/", (ws) => {
  ws.on("message", async () => {
    const livescores = await getLivescores();
    ws.send(JSON.stringify(livescores));

    setInterval(() => {
      // const livescores = await getLivescores();
      ws.send(JSON.stringify(livescores));
    }, 10000);
  });
});

router.route("/").get(getScoresByDate);

module.exports = router;

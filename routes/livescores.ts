import express from "express";
const router = express.Router();
import { getLivescores, getScoresByDate } from "../controllers/livescores";

router.ws("/", (ws) => {
  ws.on("close", () => {
    ws.terminate();
    ws.close();
    ws.removeAllListeners();
  });

  ws.on("message", async () => {
    const ls = async () => {
      const livescores = await getLivescores();
      ws.send(JSON.stringify(livescores));

      setTimeout(ls, 15000);
    };

    ls();
  });
});

router.route("/").get(getScoresByDate);

module.exports = router;

import express from "express";
const router = express.Router();
import { getLivescores, getScoresByDate } from "../controllers/livescores";

router.ws("/", (ws) => {
  ws.on("close", () => {
    console.log("The connection was closed!");
    ws.terminate();
    ws.close();
    ws.removeAllListeners();
  });

  ws.on("message", async (e) => {
    console.log(e);

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

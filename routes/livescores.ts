import express from "express";
const router = express.Router();
import { getLivescores } from "../controllers/livescores";

router.ws("/", (ws, req) => {
  ws.on("message", async () => {
    const livescores = await getLivescores();
    ws.send(JSON.stringify(livescores));

    setInterval(() => {
      // const livescores = await getLivescores();
      ws.send(JSON.stringify(livescores));
    }, 10000);
  });
});

module.exports = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const liveScores = require("../controllers/livescores");
// router.route("/").get(liveScores);
router.ws("/", (ws, req) => {
    ws.on("open", (msg) => {
        console.log("Hello");
        ws.send(msg);
    });
});
module.exports = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const livescores_1 = require("../controllers/livescores");
router.ws("/", (ws) => {
    ws.on("close", () => {
        ws.terminate();
        ws.close();
        ws.removeAllListeners();
    });
    ws.on("message", (date) => __awaiter(void 0, void 0, void 0, function* () {
        const ls = () => __awaiter(void 0, void 0, void 0, function* () {
            const livescores = yield (0, livescores_1.getLivescores)(JSON.parse(date));
            ws.send(JSON.stringify(livescores));
            setTimeout(ls, 15000);
        });
        ls();
    }));
});
router.route("/").get(livescores_1.getScoresByDate);
module.exports = router;

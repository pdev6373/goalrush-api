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
exports.getScoresByDate = exports.getLivescores = void 0;
const axios_1 = __importDefault(require("axios"));
const livescoresMapper_1 = require("../util/livescoresMapper");
const format_1 = __importDefault(require("date-fns/format"));
const getLivescores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.LIVESCORE_BASE_URL}/?met=Fixtures&APIkey=${process.env.LIVESCORE_KEY}&from=${(0, format_1.default)(new Date(), "yyyy-MM-dd")}&to=${(0, format_1.default)(new Date(), "yyyy-MM-dd")}`);
        const responseData = response.data.result;
        if (!responseData)
            return { message: "Couldn't fetch livescores", succeeded: false };
        const data = (0, livescoresMapper_1.liveScoresMapper)(responseData, (0, format_1.default)(new Date(), "yyyy-MM-dd"));
        return {
            message: "Success",
            succeeded: true,
            data,
        };
    }
    catch (err) {
        console.error(err.message);
        return { message: "Couldn't fetch livescores", succeeded: false };
    }
});
exports.getLivescores = getLivescores;
const getScoresByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.date)
        return res
            .status(301)
            .json({ message: "Invalid query parameter", succeeded: false });
    const date = req.query.date.toString();
    try {
        const response = yield axios_1.default.get(`${process.env.LIVESCORE_BASE_URL}/?met=Fixtures&APIkey=${process.env.LIVESCORE_KEY}&from=${date}&to=${date}`);
        const responseData = response.data.result;
        if (!responseData)
            res
                .status(500)
                .json({ message: "Couldn't fetch livescores", succeeded: false });
        const data = (0, livescoresMapper_1.liveScoresMapper)(responseData, date);
        res.json({
            message: "Success",
            succeeded: true,
            data,
        });
    }
    catch (err) {
        console.error(err.message);
        res
            .status(500)
            .json({ message: "Couldn't fetch livescores", succeeded: false });
    }
});
exports.getScoresByDate = getScoresByDate;

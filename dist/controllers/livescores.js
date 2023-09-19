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
const { ls } = require("../x");
const y_1 = require("../y");
const livescoresMapper_1 = require("../util/livescoresMapper");
const format_1 = __importDefault(require("date-fns/format"));
const getLivescores = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "GET",
        headers: {
            authority: "prod-public-api.livescore.com",
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            origin: "https://www.livescore.com",
            referer: "https://www.livescore.com/",
            "sec-ch-ua": "^^Chromium^^;v=^^116^^, ^^Not",
        },
    };
    const apiData = {
        date: "20230913",
        unknown: 1,
        countryCode: "NG",
        locale: "en",
        secondUnknown: 1,
    };
    try {
        // const response = await axios.get(
        //   // `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
        //   `${process.env.LIVESCORE_BASE_URL}/scheduled-events/sport/football/2023-09-15`
        //   // options
        // );
        // const mainResponse = response.data["events"];
        const response = ls["events"];
        if (!response)
            return { message: "Couldn't fetch livescores", succeeded: false };
        const data = (0, livescoresMapper_1.liveScoresMapper)(response, (0, format_1.default)(new Date(), "yyyy-MM-dd"));
        return {
            message: "Success",
            succeeded: true,
            data,
        };
    }
    catch (err) {
        console.log(err.message);
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
        // const response = await axios.get(
        //   // `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
        //   `${process.env.LIVESCORE_BASE_URL}/sport/football/scheduled-events/${date}`
        //   // options
        // );
        // const mainResponse = response.data["events"];
        const response = y_1.ols["events"];
        if (!response)
            res
                .status(500)
                .json({ message: "Couldn't fetch livescores", succeeded: false });
        const data = (0, livescoresMapper_1.liveScoresMapper)(response, date);
        res.json({
            message: "Success",
            succeeded: true,
            data,
        });
    }
    catch (err) {
        console.log(err.message);
        res
            .status(500)
            .json({ message: "Couldn't fetch livescores", succeeded: false });
    }
});
exports.getScoresByDate = getScoresByDate;

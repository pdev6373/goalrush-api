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
exports.getLivescore = exports.getLivescores = void 0;
const axios_1 = __importDefault(require("axios"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getLivescores = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        date: "20230911",
        unknown: 1,
        countryCode: "NG",
        locale: "en",
        secondUnknown: 1,
    };
    try {
        const response = yield axios_1.default.get(`${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`, options);
        const mainResponse = response.data["Stages"];
        if (!mainResponse)
            return res
                .status(500)
                .json({ message: "Couldn't fetch livescores", succeeded: false });
        const data = mainResponse.map((stage) => ({
            details: {
                stageId: stage["Sid"],
                stageName: stage["Snm"],
                stageRoute: stage["Scd"],
                competitionName: stage["Cnm"],
                competitionRoute: stage["Ccd"],
                time: "29/05/2022",
            },
            events: stage["Events"].map((event) => ({
                eventId: event["Eid"],
                isLive: true,
                winningTeam: "home",
                time: event["Eps"],
                homeTeam: {
                    id: event["T1"][0]["ID"],
                    name: event["T1"][0]["Nm"],
                    score: event["Tr1"],
                    logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T1"][0]["Img"]}`,
                },
                awayTeam: {
                    id: event["T2"][0]["ID"],
                    name: event["T2"][0]["Nm"],
                    score: event["Tr2"],
                    logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T2"][0]["Img"]}`,
                },
            })),
        }));
        return res.json({
            message: "Success",
            succeeded: true,
            data,
        });
    }
    catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Couldn't fetch livescores", succeeded: false });
    }
}));
exports.getLivescore = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        date: "20230911",
        unknown: 1,
        countryCode: "NG",
        locale: "en",
        secondUnknown: 1,
        eventCode: 123,
    };
    try {
        const response = yield axios_1.default.get(`${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`, options);
        const mainResponse = response.data["Stages"];
        if (!mainResponse)
            return res
                .status(500)
                .json({ message: "Couldn't fetch livescores", succeeded: false });
        const data = mainResponse.map((stage) => ({
            details: {
                stageId: stage["Sid"],
                stageName: stage["Snm"],
                stageRoute: stage["Scd"],
                competitionName: stage["Cnm"],
                competitionRoute: stage["Ccd"],
                time: "29/05/2022",
            },
            events: stage["Events"].map((event) => ({
                eventId: event["Eid"],
                isLive: true,
                winningTeam: "home",
                time: event["Eps"],
                homeTeam: {
                    id: event["T1"][0]["ID"],
                    name: event["T1"][0]["Nm"],
                    score: event["Tr1"],
                    logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T1"][0]["Img"]}`,
                },
                awayTeam: {
                    id: event["T2"][0]["ID"],
                    name: event["T2"][0]["Nm"],
                    score: event["Tr2"],
                    logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T2"][0]["Img"]}`,
                },
            })),
        }));
        return res.json({
            message: "Success",
            succeeded: true,
            data,
        });
    }
    catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Couldn't fetch livescores", succeeded: false });
    }
}));

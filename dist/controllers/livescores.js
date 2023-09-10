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
const axios_1 = __importDefault(require("axios"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getLivescores = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        const response = yield axios_1.default.get(process.env.LIVESCORE_API, options);
        if (!response.data["Stages"])
            return res
                .status(500)
                .json({ message: "Couldn't fetch livescores", succeeded: false });
        return res.json({
            message: "Success",
            data: response.data["Stages"],
            succeeded: true,
        });
    }
    catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Couldn't fetch livescores", succeeded: false });
    }
}));
module.exports = getLivescores;

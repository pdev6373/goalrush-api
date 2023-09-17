"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTournamentCategories = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getTournamentCategories = (req, res) => {
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
        const response = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "y.json"), { encoding: "utf-8" });
        // const mainResponse = response.data["categories"];
        const mainResponse = JSON.parse(response)["categories"];
        if (!mainResponse)
            res
                .status(500)
                .json({ message: "Couldn't fetch categories", succeeded: false });
        const data = mainResponse.map((category) => ({
            name: category["category"]["name"],
            slug: category["category"]["slug"],
            flag: category["category"]["flag"],
        }));
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
            .json({ message: "Couldn't fetch categories", succeeded: false });
    }
};
exports.getTournamentCategories = getTournamentCategories;

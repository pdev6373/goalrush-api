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
exports.getLivescores = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const puppeteer_1 = __importDefault(require("puppeteer"));
exports.getLivescores = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto("https://www.sofascore.com/", {
        waitUntil: "domcontentloaded",
    });
    // await browser.close();
    const getAllLiveScores = yield page.evaluate(() => {
        // let allTournaments: { tournament: any; events: any }[] = [];
        // let oneTournament: any[] = [];
        // const tournaments = document.querySelectorAll(
        //   ".sc-fqkvVR.fxAOyU > div:not(.sc-fqkvVR) > *"
        // );
        const y = document.querySelector(".sc-fqkvVR.ldMYMQ.sc-d8bc48b6-2.lmVlEQ > .sc-fqkvVR.fxAOyU");
        // y?.querySelectorAll("div");
        return y === null || y === void 0 ? void 0 : y.innerHTML;
        // return Array.from(y).map((x) => x.innerHTML);
        // const x = [].slice.call(tournaments);
        // const x = Array.from(tournaments).map((x) => x.innerHTML);
        // return x;
        // console.log("x: ", x);
        // Array.from(tournaments).forEach((tournament, index, array) => {
        //   if (array.length - 1 === index) {
        //     oneTournament.push(tournament.tagName);
        //     allTournaments.push({
        //       tournament: oneTournament[0],
        //       events: oneTournament[1],
        //     });
        //     oneTournament = [];
        //   } else {
        //     if (tournament.tagName.toLowerCase() === "hr") {
        //       allTournaments.push({
        //         tournament: oneTournament[0],
        //         events: oneTournament[1],
        //       });
        //       oneTournament = [];
        //     } else {
        //       oneTournament.push(tournament.tagName);
        //     }
        //   }
        // });
        // return allTournaments;
        //  console.log(x);
        // ?.querySelector("div:not([class])")
        // ?.getElementsByClassName("sc-fqkvVR byYarT");
        // return tournaments?.tagName;
        // return (
        //   tournaments &&
        //   Array.from(tournaments).map((tournament) => tournament.tagName)
        // );
    });
    console.log(getAllLiveScores);
    return res.status(204).json({
        message: "success",
    });
}));
// export const getLivescores = async () => {
//   const options = {
//     method: "GET",
//     headers: {
//       authority: "prod-public-api.livescore.com",
//       accept: "*/*",
//       "accept-language": "en-US,en;q=0.9",
//       origin: "https://www.livescore.com",
//       referer: "https://www.livescore.com/",
//       "sec-ch-ua": "^^Chromium^^;v=^^116^^, ^^Not",
//     },
//   };
//   const apiData = {
//     date: "20230913",
//     unknown: 1,
//     countryCode: "NG",
//     locale: "en",
//     secondUnknown: 1,
//   };
//   try {
//     const response = await axios.get(
//       `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
//       options
//     );
//     const mainResponse = response.data["Stages"];
//     if (!mainResponse)
//       return { message: "Couldn't fetch livescores", succeeded: false };
//     const data: AllLiveScoresType[] = mainResponse.map((stage: any) => ({
//       details: {
//         stageId: stage["Sid"],
//         stageName: stage["Snm"],
//         stageRoute: stage["Scd"],
//         competitionName: stage["Cnm"],
//         competitionRoute: stage["Ccd"],
//         time: "29/05/2022",
//       },
//       events: stage["Events"].map((event: any) => ({
//         eventId: event["Eid"],
//         isLive: true,
//         winningTeam: "home",
//         time: event["Eps"],
//         startTime: event["Esd"],
//         homeTeam: {
//           id: event["T1"][0]["ID"],
//           name: event["T1"][0]["Nm"],
//           score: event["Tr1"],
//           logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T1"][0]["Img"]}`,
//         },
//         awayTeam: {
//           id: event["T2"][0]["ID"],
//           name: event["T2"][0]["Nm"],
//           score: event["Tr2"],
//           logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T2"][0]["Img"]}`,
//         },
//       })),
//     }));
//     return {
//       message: "Success",
//       succeeded: true,
//       data,
//     };
//   } catch (err: any) {
//     console.log(err.message);
//     return { message: "Couldn't fetch livescores", succeeded: false };
//   }
// };
// export const getLivescore = asyncHandler(async (req: any, res: any) => {
//   const options = {
//     method: "GET",
//     headers: {
//       authority: "prod-public-api.livescore.com",
//       accept: "*/*",
//       "accept-language": "en-US,en;q=0.9",
//       origin: "https://www.livescore.com",
//       referer: "https://www.livescore.com/",
//       "sec-ch-ua": "^^Chromium^^;v=^^116^^, ^^Not",
//     },
//   };
//   const apiData = {
//     date: "20230911",
//     unknown: 1,
//     countryCode: "NG",
//     locale: "en",
//     secondUnknown: 1,
//     eventCode: 123,
//   };
//   try {
//     const response = await axios.get(
//       `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
//       options
//     );
//     const mainResponse = response.data["Stages"];
//     if (!mainResponse)
//       return res
//         .status(500)
//         .json({ message: "Couldn't fetch livescores", succeeded: false });
//     const data: AllLiveScoresType[] = mainResponse.map((stage: any) => ({
//       details: {
//         stageId: stage["Sid"],
//         stageName: stage["Snm"],
//         stageRoute: stage["Scd"],
//         competitionName: stage["Cnm"],
//         competitionRoute: stage["Ccd"],
//         time: "29/05/2022",
//       },
//       events: stage["Events"].map((event: any) => ({
//         eventId: event["Eid"],
//         isLive: true,
//         winningTeam: "home",
//         time: event["Eps"],
//         homeTeam: {
//           id: event["T1"][0]["ID"],
//           name: event["T1"][0]["Nm"],
//           score: event["Tr1"],
//           logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T1"][0]["Img"]}`,
//         },
//         awayTeam: {
//           id: event["T2"][0]["ID"],
//           name: event["T2"][0]["Nm"],
//           score: event["Tr2"],
//           logo: `${process.env.EVENT_IMAGE_BASE_URL}/${event["T2"][0]["Img"]}`,
//         },
//       })),
//     }));
//     return res.json({
//       message: "Success",
//       succeeded: true,
//       data,
//     });
//   } catch (err: any) {
//     console.log(err.message);
//     return res
//       .status(500)
//       .json({ message: "Couldn't fetch livescores", succeeded: false });
//   }
// });

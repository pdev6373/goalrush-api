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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getLivescores = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [];
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
        const response = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "x.json"), { encoding: "utf-8" }
        // (err, data) => {
        //   if (err) throw err;
        //   res = data;
        // }
        );
        // const mainResponse = response.data["events"];
        const mainResponse = JSON.parse(response)["events"];
        if (!mainResponse)
            return { message: "Couldn't fetch livescores", succeeded: false };
        const tournaments = mainResponse
            .filter((tournament) => new Date(tournament["startTimestamp"] * 1000).getDate() ==
            new Date().getDate())
            .map((tournament) => ({
            details: {
                tournamentName: tournament["tournament"]["name"],
                tournamentSlug: tournament["tournament"]["slug"],
                competitionName: tournament["tournament"]["category"]["name"],
                competitionSlug: tournament["tournament"]["category"]["slug"],
                time: tournament["time"],
            },
            event: {
                id: tournament["id"],
                route: tournament["slug"],
                time: tournament["time"],
                startTime: tournament["startTimestamp"],
                status: tournament["status"],
                homeTeam: {
                    name: tournament["homeTeam"]["name"],
                    shortName: tournament["homeTeam"]["shortName"],
                    colors: tournament["homeTeam"]["teamColors"],
                    code: tournament["homeTeam"]["nameCode"],
                    route: tournament["homeTeam"]["slug"],
                    score: tournament["homeScore"]["current"],
                    logo: `${process.env.LIVESCORE_BASE_URL}/team/${tournament["homeTeam"]["id"]}/image/small`,
                },
                awayTeam: {
                    name: tournament["awayTeam"]["name"],
                    shortName: tournament["awayTeam"]["shortName"],
                    colors: tournament["awayTeam"]["teamColors"],
                    code: tournament["awayTeam"]["nameCode"],
                    route: tournament["awayTeam"]["slug"],
                    score: tournament["awayScore"]["current"],
                    logo: `${process.env.LIVESCORE_BASE_URL}/team/${tournament["awayTeam"]["id"]}/image/small`,
                },
            },
        }));
        tournaments.forEach((tournament) => {
            if (!data.length) {
                data.push({
                    details: tournament.details,
                    events: [tournament.event],
                });
            }
            else {
                const foundData = data.find((data) => data.details.competitionName ===
                    tournament.details.competitionName &&
                    data.details.tournamentName === tournament.details.tournamentName);
                foundData
                    ? foundData.events.push(tournament.event)
                    : data.push({
                        details: tournament.details,
                        events: [tournament.event],
                    });
            }
        });
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

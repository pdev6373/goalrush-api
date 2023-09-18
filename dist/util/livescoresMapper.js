"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveScoresMapper = void 0;
const format_1 = __importDefault(require("date-fns/format"));
const liveScoresMapper = (array, date) => {
    const data = [];
    const tournaments = array
        .filter((tournament) => (0, format_1.default)(new Date(tournament["startTimestamp"] * 1000), "yyyy-MM-dd") ===
        date)
        .map((tournament) => ({
        details: {
            tournamentName: tournament["tournament"]["name"],
            tournamentSlug: tournament["tournament"]["slug"],
            competitionName: tournament["tournament"]["category"]["name"],
            competitionSlug: tournament["tournament"]["category"]["slug"],
            competitionImage: `${process.env.COMPETITION_IMAGE_BASE_URL}/${tournament["tournament"]["category"]["alpha2"] ||
                tournament["tournament"]["category"]["flag"]}.png`.toLowerCase(),
            time: tournament["time"],
        },
        event: {
            id: tournament["id"],
            route: tournament["slug"],
            time: tournament["time"],
            changeTime: tournament["changes"]["changeTimestamp"],
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
            const foundData = data.find((data) => data.details.competitionName === tournament.details.competitionName &&
                data.details.tournamentName === tournament.details.tournamentName);
            foundData
                ? foundData.events.push(tournament.event)
                : data.push({
                    details: tournament.details,
                    events: [tournament.event],
                });
        }
    });
    return data;
};
exports.liveScoresMapper = liveScoresMapper;

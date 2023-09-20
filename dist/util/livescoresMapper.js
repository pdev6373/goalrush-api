"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveScoresMapper = void 0;
const liveScoresMapper = (array, date) => {
    const data = [];
    const tournaments = array.map((tournament) => ({
        details: {
            tournamentName: tournament["league_name"],
            tournamentSlug: tournament["league_name"]
                .split(" ")
                .join("-")
                .toLowerCase(),
            competitionName: tournament["country_name"],
            competitionSlug: tournament["country_name"]
                .split(" ")
                .join("-")
                .toLowerCase(),
            competitionImage: tournament["country_logo"],
            time: tournament["event_date"],
        },
        event: {
            id: tournament["event_key"],
            time: tournament["event_status"],
            startTime: tournament["event_time"],
            score: tournament["event_final_result"],
            route: "",
            homeTeam: {
                name: tournament["event_home_team"],
                shortName: tournament["event_home_team"],
                logo: tournament["home_team_logo"],
                route: tournament["event_home_team"],
                colors: [],
                code: "",
            },
            awayTeam: {
                name: tournament["event_away_team"],
                shortName: tournament["event_away_team"],
                logo: tournament["away_team_logo"],
                route: tournament["event_away_team"],
                colors: [],
                code: "",
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

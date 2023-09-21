// type MatchStatusType = {
//   description:
//     | "1st half"
//     | "2nd half"
//     | "Halftime"
//     | "Not started"
//     | "Postponed"
//     | "Ended"
//     | "Canceled";
//   type: "inprogress" | "notstarted" | "postponed" | "finished" | "canceled";
// };

export type MatchStatusType =
  | "Finished"
  | "Postponed"
  | "Cancelled"
  | "Half Time"
  | "After Pen."
  | "Susp."
  | "After ET"
  | string;

type LiveScoreDetailsType = {
  // stageId: string;
  // stageName: string;
  // stageRoute: string;
  // competitionName: string;
  // competitionRoute: string;
  // time: string;

  // tournamentId: string;
  // tournamentRoute: string;
  tournamentName: string;
  tournamentSlug: string;
  time: string;
  competitionImage: string;
  // competitionId: string;
  // competitionRoute: string;
  competitionName: string;
  competitionSlug: string;
};

type LiveScoreTeamDetailsType = {
  // score: number;
  route: string;
  name: string;
  shortName: string;
  colors: object;
  code: string;
  logo: string;
};

type LiveScoreEventType = {
  // eventId: string;
  // isLive: boolean;
  // winningTeam: "home" | "away" | "none";
  // time: string;
  // startTime: number;
  // homeTeam: LiveScoreTeamDetailsType;
  // awayTeam: LiveScoreTeamDetailsType;

  id: string;
  route: string;
  startTime: number;
  time: MatchStatusType;
  homeTeam: LiveScoreTeamDetailsType;
  awayTeam: LiveScoreTeamDetailsType;
  score: string;
};

export type AllLiveScoresType = {
  details: LiveScoreDetailsType;
  events: LiveScoreEventType[];
};

export type ModifiedLivescoresType = {
  details: LiveScoreDetailsType;
  event: LiveScoreEventType;
};

export type TournamentCategoriesType = {
  name: string;
  slug: string;
  flag: string;
};

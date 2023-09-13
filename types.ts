type LiveScoreDetailsType = {
  stageId: string;
  stageName: string;
  stageRoute: string;
  competitionName: string;
  competitionRoute: string;
  time: string;
};

type LiveScoreTeamDetailsType = {
  id: string;
  name: string;
  score: number;
  logo: string;
};

type LiveScoreEventType = {
  eventId: string;
  isLive: boolean;
  winningTeam: "home" | "away" | "none";
  time: string;
  startTime: number;
  homeTeam: LiveScoreTeamDetailsType;
  awayTeam: LiveScoreTeamDetailsType;
};

export type AllLiveScoresType = {
  details: LiveScoreDetailsType;
  events: LiveScoreEventType[];
};

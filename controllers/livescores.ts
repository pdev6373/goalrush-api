import axios from "axios";
import asyncHandler from "express-async-handler";
import { AllLiveScoresType } from "../types";

export const getLivescores = async () => {
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
    const response = await axios.get(
      `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
      options
    );

    const mainResponse = response.data["Stages"];

    if (!mainResponse)
      return { message: "Couldn't fetch livescores", succeeded: false };

    const data: AllLiveScoresType[] = mainResponse.map((stage: any) => ({
      details: {
        stageId: stage["Sid"],
        stageName: stage["Snm"],
        stageRoute: stage["Scd"],
        competitionName: stage["Cnm"],
        competitionRoute: stage["Ccd"],
        time: "29/05/2022",
      },
      events: stage["Events"].map((event: any) => ({
        eventId: event["Eid"],
        isLive: true,
        winningTeam: "home",
        time: event["Eps"],
        startTime: event["Esd"],
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

    return {
      message: "Success",
      succeeded: true,
      data,
    };
  } catch (err: any) {
    console.log(err.message);
    return { message: "Couldn't fetch livescores", succeeded: false };
  }
};

export const getLivescore = asyncHandler(async (req: any, res: any) => {
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
    const response = await axios.get(
      `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
      options
    );

    const mainResponse = response.data["Stages"];

    if (!mainResponse)
      return res
        .status(500)
        .json({ message: "Couldn't fetch livescores", succeeded: false });

    const data: AllLiveScoresType[] = mainResponse.map((stage: any) => ({
      details: {
        stageId: stage["Sid"],
        stageName: stage["Snm"],
        stageRoute: stage["Scd"],
        competitionName: stage["Cnm"],
        competitionRoute: stage["Ccd"],
        time: "29/05/2022",
      },
      events: stage["Events"].map((event: any) => ({
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
  } catch (err: any) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Couldn't fetch livescores", succeeded: false });
  }
});

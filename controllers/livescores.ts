import axios from "axios";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
const { ls } = require("../x");
import { ols } from "../y";
import { liveScoresMapper } from "../util/livescoresMapper";
import format from "date-fns/format";

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
    // const response = await axios.get(
    //   // `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
    //   `${process.env.LIVESCORE_BASE_URL}/scheduled-events/sport/football/2023-09-15`
    //   // options
    // );

    // const mainResponse = response.data["events"];
    const response = ls["events"];

    if (!response)
      return { message: "Couldn't fetch livescores", succeeded: false };

    const data = liveScoresMapper(response, format(new Date(), "yyyy-MM-dd"));

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

export const getScoresByDate = async (req: Request, res: Response) => {
  if (!req.query.date)
    return res
      .status(301)
      .json({ message: "Invalid query parameter", succeeded: false });

  const date = req.query.date.toString();

  try {
    // const response = await axios.get(
    //   // `${process.env.LIVESCORE_BASE_URL}/${apiData.date}/${apiData.unknown}?countryCode=${apiData.countryCode}&locale=${apiData.locale}&MD=${apiData.secondUnknown}`,
    //   `${process.env.LIVESCORE_BASE_URL}/sport/football/scheduled-events/${date}`
    //   // options
    // );

    // const mainResponse = response.data["events"];
    const response = ols["events"];

    if (!response)
      res
        .status(500)
        .json({ message: "Couldn't fetch livescores", succeeded: false });

    const data = liveScoresMapper(response, date);

    console.log(data);

    res.json({
      message: "Success",
      succeeded: true,
      data,
    });
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Couldn't fetch livescores", succeeded: false });
  }
};

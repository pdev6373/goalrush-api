import axios from "axios";
import { Request, Response } from "express";
import { liveScoresMapper } from "../util/livescoresMapper";

export const getLivescores = async (date: string) => {
  console.log(date);

  try {
    const response = await axios.get(
      `${process.env.LIVESCORE_BASE_URL}/?met=Fixtures&APIkey=${process.env.LIVESCORE_KEY}&from=${date}&to=${date}`
    );

    const responseData = response.data.result;

    if (!responseData)
      return { message: "Couldn't fetch livescores", succeeded: false };

    const data = liveScoresMapper(responseData, date);

    return {
      message: "Success",
      succeeded: true,
      data,
    };
  } catch (err: any) {
    console.error(err.message);
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
    const response = await axios.get(
      `${process.env.LIVESCORE_BASE_URL}/?met=Fixtures&APIkey=${process.env.LIVESCORE_KEY}&from=${date}&to=${date}`
    );

    const responseData = response.data.result;

    if (!responseData)
      res
        .status(500)
        .json({ message: "Couldn't fetch livescores", succeeded: false });

    const data = liveScoresMapper(responseData, date);

    res.json({
      message: "Success",
      succeeded: true,
      data,
    });
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Couldn't fetch livescores", succeeded: false });
  }
};

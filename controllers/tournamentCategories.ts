import { Request, Response } from "express";
import { TournamentCategoriesType } from "../types";
import fs from "fs";
import path from "path";

export const getTournamentCategories = (req: Request, res: Response) => {
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

    const response: any = fs.readFileSync(
      path.join(__dirname, "..", "y.json"),
      { encoding: "utf-8" }
    );

    // const mainResponse = response.data["categories"];
    const mainResponse = JSON.parse(response)["categories"];

    if (!mainResponse)
      res
        .status(500)
        .json({ message: "Couldn't fetch categories", succeeded: false });

    const data: TournamentCategoriesType[] = mainResponse.map(
      (category: any) =>
        ({
          name: category["category"]["name"],
          slug: category["category"]["slug"],
          flag: category["category"]["flag"],
        } as TournamentCategoriesType)
    );

    res.json({
      message: "Success",
      succeeded: true,
      data,
    });
  } catch (err: any) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Couldn't fetch categories", succeeded: false });
  }
};

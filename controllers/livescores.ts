import axios from "axios";
import asyncHandler from "express-async-handler";

const getLivescores = asyncHandler(async (req: any, res: any) => {
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

  try {
    const response = await axios.get(process.env.LIVESCORE_API!, options);

    if (!response.data["Stages"])
      return res
        .status(500)
        .json({ message: "Couldn't fetch livescores", succeeded: false });
    return res.json({
      message: "Success",
      data: response.data["Stages"],
      succeeded: true,
    });
  } catch (err: any) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Couldn't fetch livescores", succeeded: false });
  }
});

module.exports = getLivescores;

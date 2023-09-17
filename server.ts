require("dotenv").config();
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
require("express-ws")(app);

const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// app.use("/tournament-categories", require("./routes/tournament-categories"));
app.use("/news", require("./routes/news"));
app.use("/livescores", require("./routes/livescores"));

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

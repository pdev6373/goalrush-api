require("dotenv").config();
import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = require("./config/corsOptions");
// import { logger } from "./middleware/logger";
// const { logger } = require("./middleware/logger");

const PORT = process.env.PORT || 3500;

dotenv.config();
const app: Express = express();

// app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/livescores", require("./routes/livescores"));

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

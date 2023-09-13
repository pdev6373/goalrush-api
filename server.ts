require("dotenv").config();
import express, { Express, Request, Response, response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { format } from "date-fns";

const app: Express = express();
const expressWs = require("express-ws")(app);

const corsOptions = require("./config/corsOptions");
// import { logger } from "./middleware/logger";
// const { logger } = require("./middleware/logger");

const PORT = process.env.PORT || 443;

// app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

console.log(format(20230911194500, "yyyy-MM-dd"));

app.use("/livescores", require("./routes/livescores"));

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

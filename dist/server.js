"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = require("./config/corsOptions");
// import { logger } from "./middleware/logger";
// const { logger } = require("./middleware/logger");
const PORT = process.env.PORT || 3500;
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(logger);
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/livescores", require("./routes/livescores"));
app.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

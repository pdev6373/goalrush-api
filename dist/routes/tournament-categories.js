"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tournamentCategories_1 = require("../controllers/tournamentCategories");
const router = express_1.default.Router();
router.route("/").get(tournamentCategories_1.getTournamentCategories);
module.exports = router;

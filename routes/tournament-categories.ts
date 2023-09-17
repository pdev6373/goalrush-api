import express from "express";
import { getTournamentCategories } from "../controllers/tournamentCategories";
const router = express.Router();

router.route("/").get(getTournamentCategories);

module.exports = router;

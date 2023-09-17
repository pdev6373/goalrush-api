import express from "express";
const router = express.Router();

router.route("/").get((req, res) => res.json({ x: "hello" }));

module.exports = router;

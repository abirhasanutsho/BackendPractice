import { getCountry } from "../controller/countrycontroller";
import express from "express";

const router = express.Router();

router.get("/api/country", getCountry);

export default router;
import { createAccount } from "../controller/authcontroller";
import express from "express";

const router = express.Router();

router.post("/api/user/registration", createAccount);

export default router;
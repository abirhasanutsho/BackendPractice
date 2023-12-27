import { loginUser } from "../controller/logincontroller";
import express from "express";

const router = express.Router();

router.post("/api/user/login", loginUser);

export default router;
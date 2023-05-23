import { Router } from "express";

import { logIn, showProfile, signUp } from "../controllers/UserController";

import UserAuthentication from "../middlewares/UserAuthentication";

const router = Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.get("/profile", UserAuthentication, showProfile);

export default router;

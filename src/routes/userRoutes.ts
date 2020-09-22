import express from "express";
import { login } from "../endpoints/login";
import { signUp } from "../endpoints/signUp";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
import express from "express";
import { login } from "../endpoints/login";
import { signUp } from "../endpoints/signUp";
import { friendship } from "../endpoints/friendship";
import { unFriendship } from "../endpoints/unFriendship";


export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/friendship", friendship);
userRouter.post("/unfriendship", unFriendship);
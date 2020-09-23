import express from "express";
import { login } from "../endpoints/login";
import { signUp } from "../endpoints/signUp";
import { friendship } from "../endpoints/friendship";
import { unFriendship } from "../endpoints/unFriendship";
import { createPost } from "../endpoints/createPost";
import { feedPosts } from "../endpoints/feedPosts";
import { filterPosts } from "../endpoints/filterPosts";


export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/friendship", friendship);
userRouter.post("/unfriendship", unFriendship);
userRouter.post("/createpost", createPost);
userRouter.get("/feed", feedPosts);
userRouter.get("/feed/user", filterPosts);
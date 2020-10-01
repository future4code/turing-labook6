import express from "express";
import PostController from "../controller/PostController";

export const postRoutes = express.Router();

const postController = new PostController();

postRoutes.get("/", postController.feedPosts);
postRoutes.post("/createpost", postController.createPost);
postRoutes.get("/feed", postController.filterPosts);
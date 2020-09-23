import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { User } from '../model/User';
import { BaseDatabase } from "../data/BaseDatabase";
import { UserPosts } from "../business/UserPosts";
import { userRouter } from "../routes/userRoutes";
import { POST_TYPE } from './../data/UserDatabase';
import dayjs from "dayjs";

export const feedPosts = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userPosts = new UserPosts();
        const result = await userPosts.getFeedPosts(token);
        const posts = result.map((post: any) => {
            return ({
                id: post.id,
                photo: post.photo,
                title: post.title,
                description: post.description,
                createAt: dayjs(post.createAt, "YYYY-MM-DD").format("DD/MM/YYYY"),
                userId: post.AuthorId,
                userName: post.name
            }
            );
          })

        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}
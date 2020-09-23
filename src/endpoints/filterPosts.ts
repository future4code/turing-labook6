import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { User } from '../model/User';
import { BaseDatabase } from "../data/BaseDatabase";
import { UserPosts } from "../business/UserPosts";
import { userRouter } from "../routes/userRoutes";
import { POST_TYPE } from './../data/UserDatabase';
import dayjs from "dayjs";

export const filterPosts = async (req: Request, res: Response) => {
    try {
        const type = req.query.type as string || "NORMAL";
        const result: any = await new UserPosts().getPostsType(type);
        const posts = result.map((post: any) => {
            return ({
                id: post.id,
                type: post.type,
                photo: post.photo,
                title: post.title,
                description: post.description,
                createAt: dayjs(post.createAt, "YYYY-MM-DD").format("DD/MM/YYYY"),
                userId: post.userId_labook,
                userName: post.name
            }
            );
          })

        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}
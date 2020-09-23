import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { User } from '../model/User';
import { BaseDatabase } from "../data/BaseDatabase";
import { UserPosts } from "../business/UserPosts";
import { userRouter } from "../routes/userRoutes";
import { POST_TYPE } from './../data/UserDatabase';


export const createPost = async (req: Request, res: Response) => {
    try {
        const post = {
            photo: req.body.photo,
            description: req.body.description,
            type: req.body.type as POST_TYPE
        };

        const token = req.headers.authorization as string;

        const userPosts = new UserPosts();
        await userPosts.createPost(post, token);
        
        res.status(200).send({
            message: "Post publicado com sucesso"
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDatabase.destroyConnection();
    }
}
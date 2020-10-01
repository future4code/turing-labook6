import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserPostsBusiness } from "../business/UserPostsBusiness";
import { POST_TYPE } from "../data/UserDatabase";
import dayjs from "dayjs";

export default class PostController {

    public createPost = async (req: Request, res: Response) => {
        try {
            const post = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type as POST_TYPE
            };
    
            const token = req.headers.authorization as string;
    
            await new UserPostsBusiness().createPost(post, token);
            
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

    public feedPosts = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const result = await new UserPostsBusiness().getFeedPosts(token);
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

    public filterPosts = async (req: Request, res: Response) => {
        try {
            const type = req.query.type as string || "NORMAL";
            const result: any = await new UserPostsBusiness().getPostsType(type);
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
}
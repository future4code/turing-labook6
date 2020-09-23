import { Request, Response } from "express";
import { UserRelationBusiness } from "../business/UserRelationBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const friendship = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const friendId = req.body.friendId;
        const userRelationBusiness = new UserRelationBusiness();
        await userRelationBusiness.friendship(friendId, token);
        
        res.status(200).send({
            message: "Você virou amigo desse usuário."
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDatabase.destroyConnection();
    }
}
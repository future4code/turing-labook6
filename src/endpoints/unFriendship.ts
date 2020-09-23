import { Request, Response } from "express";
import { UserRelationBusiness } from "../business/UserRelationBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const unFriendship = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const friendId = req.body.friendId;
        const userRelationBusiness = new UserRelationBusiness();
        await userRelationBusiness.unFriendship(friendId, token);
        
        res.status(200).send({
            message: "Você desfez a amizade com essa pessoa."
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDatabase.destroyConnection();
    }
}
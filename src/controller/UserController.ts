import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { User } from '../model/User';
import { BaseDatabase } from "../data/BaseDatabase";
import { UserRelationBusiness } from "../business/UserRelationBusiness";

export default class UserController {

    public signUp = async (req: Request, res: Response) => {
        try {
            const user: User = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
    
            const token = await new UserBusiness().signUp(user);
            
            res.status(200).send({
                message: "Usuário criado com sucesso!",
                token
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const user: any = {
                email: req.body.email,
                password: req.body.password
            };
    
            const token = await new UserBusiness().login(user);
            
            res.status(200).send({
                token
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    public friendship = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const friendId = req.body.friendId;
            await new UserRelationBusiness().friendship(friendId, token);
            
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

    public unFriendship = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const friendId = req.body.friendId;
            await new UserRelationBusiness().unFriendship(friendId, token);
            
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
}
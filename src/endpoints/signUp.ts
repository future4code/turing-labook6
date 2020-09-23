import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { User } from '../model/User';
import { BaseDatabase } from "../data/BaseDatabase";

export const signUp = async (req: Request, res: Response) => {
    try {
        const user: User = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const userBusiness = new UserBusiness();
        const token = await userBusiness.signUp(user);
        
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
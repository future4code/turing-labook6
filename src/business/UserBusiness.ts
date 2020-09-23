import { User } from '../model/User';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase } from './../data/UserDatabase';

export class UserBusiness {
    public async signUp(user: User): Promise<string> {
        if(!user.name || !user.email || !user.password) {
            throw new Error('Preencha todos os campos.');
        }

        if(user.password.length < 6) {
            throw new Error('A senha precisa ter no mínimo 6 caracteres.')
        }

        if(user.email.indexOf('@') === -1) {
            throw new Error('Email inválido.');
        }

        const id = new IdGenerator().generate();

        const newPassword = await new HashManager().hash(user.password);

        await new UserDatabase().createUser(
            id,
            user.name,
            user.email,
            newPassword
        );

        const token = new Authenticator().generateToken({id});
        
        return token;
    }

    public async login(user: any): Promise<string> {
        if(!user.email || !user.password) {
            throw new Error("Preencha todos os dados")
        }

        const userData = await new UserDatabase().getUserByEmail(user.email);

        const passwordCorrect = await new HashManager().compare(user.password, userData.password);

        if(!passwordCorrect) {
            throw new Error("Email ou senha incorreto")
        }

        const token = new Authenticator().generateToken({id: userData.id});

        return token
    }
}
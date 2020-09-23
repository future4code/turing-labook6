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

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const newPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id,
            user.name,
            user.email,
            newPassword
        );

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({id});
        
        return token;
    }

    public async login(user: any): Promise<string> {
        if(!user.email || !user.password) {
            throw new Error("Preencha todos os dados")
        }

        const userDatabase = new UserDatabase();
        const userData = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const passwordCorrect = await hashManager.compare(user.password, userData.password);

        if(!passwordCorrect) {
            throw new Error("Email ou senha incorreto")
        }

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({id: userData.id});

        return token
    }
}
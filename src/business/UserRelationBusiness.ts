import { UserRelationDatabase } from '../data/UserRelationDatabase';
import { User } from '../model/User';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase } from './../data/UserDatabase';

export class UserRelationBusiness {
    public async friendship(friendId: string, token: string): Promise<void> {
        if(!friendId) {
            throw new Error('Preencha todos os campos');
        }

        const authenticator = new Authenticator();
        const userDb = authenticator.getData(token);

        const userRelationDatabase = new UserRelationDatabase();
        await userRelationDatabase.creatFriendship(userDb.id, friendId)
    }

    public async unFriendship(friendId: string, token: string): Promise<void> {
        if(!friendId) {
            throw new Error('Preencha todos os campos');
        }

        const authenticator = new Authenticator();
        const userDb = authenticator.getData(token);
        
        const userRelationDatabase = new UserRelationDatabase();
        await userRelationDatabase.brokenFriendship(userDb.id, friendId)
    }
}
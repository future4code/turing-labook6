import { UserRelationDatabase } from '../data/UserRelationDatabase';
import { Authenticator } from '../services/Authenticator';

export class UserRelationBusiness {
    public async friendship(friendId: string, token: string): Promise<void> {
        if(!friendId) {
            throw new Error('Preencha todos os campos');
        }

        const userDb = new Authenticator().getData(token);

        await new UserRelationDatabase().creatFriendship(userDb.id, friendId)
    }

    public async unFriendship(friendId: string, token: string): Promise<void> {
        if(!friendId) {
            throw new Error('Preencha todos os campos');
        }

        const userDb = new Authenticator().getData(token);

        const userRelationDatabase = new UserRelationDatabase();
        
        const checkFriendship: void | any = await userRelationDatabase.checkFriendship(userDb.id, friendId);

        if(!checkFriendship) {
            throw new Error("Você não tem amizade com esse usuário.")
        }

        await userRelationDatabase.brokenFriendship(userDb.id, friendId)
    }
}
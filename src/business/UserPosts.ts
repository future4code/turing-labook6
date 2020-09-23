import { UserRelationDatabase } from '../data/UserRelationDatabase';
import { User } from '../model/User';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase, POST_TYPE } from './../data/UserDatabase';
import dayjs from 'dayjs';

export class UserPosts {
    public async createPost(post: any, token: string): Promise<void> {
        if(!post.photo || !post.description) {
            throw new Error('Preencha todos os campos');
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const authenticator = new Authenticator();
        const userDb = authenticator.getData(token);

        const userDatabase = new UserDatabase();

        const data = dayjs().format("YYYY-MM-DD")

        await userDatabase.createPost(
            id,
            post.photo,
            post.description,
            data,
            post.type as POST_TYPE,
            userDb.id
        )

    }
}
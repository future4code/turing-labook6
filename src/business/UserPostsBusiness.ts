import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase, POST_TYPE } from './../data/UserDatabase';
import dayjs from 'dayjs';

export class UserPostsBusiness {
    public async createPost(post: any, token: string): Promise<void> {
        if(!post.photo || !post.description) {
            throw new Error('Preencha todos os campos');
        }

        const id = new IdGenerator().generate();

        const userDb = new Authenticator().getData(token);

        const data = dayjs().format("YYYY-MM-DD")

        await new UserDatabase().createPost(
            id,
            post.photo,
            post.description,
            data,
            post.type as POST_TYPE,
            userDb.id
        )

    }

    public async getFeedPosts(token: string): Promise<any>{
        const userDb = new Authenticator().getData(token);

        return await new UserDatabase().getFeedPosts(userDb.id);
    }

    public async getPostsType(type: string): Promise<any>{
        return await new UserDatabase().getPostsType(type);
    }
}
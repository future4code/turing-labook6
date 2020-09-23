import { BaseDatabase } from "./BaseDatabase";

export enum POST_TYPE {
    NORMAL = "NORMAL",
    EVENT = "EVENT"
  }

export class UserDatabase extends BaseDatabase {
    private static TABLE_USERS: string = "UserLabook";
    private static TABLE_POSTS: string = "Posts";

    public async createUser(
        id: string,
        name: string,
        email: string,
        password: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    email,
                    password
                }).into(UserDatabase.TABLE_USERS)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async createPost(
        id: string,
        photo: string,
        description: string,
        createAt: string,
        type: POST_TYPE,
        userId_labook: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    photo,
                    description,
                    createAt,
                    type,
                    userId_labook
                }).into(UserDatabase.TABLE_POSTS)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserByEmail(email: string): Promise<any> {
        try {
            const result = await this.getConnection()
                    .select('*')
                    .from(UserDatabase.TABLE_USERS)
                    .where({email})
                return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserById(id: string): Promise<any> {
        const result = await this.getConnection()
            .select('*')
            .from(UserDatabase.TABLE_USERS)
            .where({ id })
        return result[0]
    }

    public async getFeedPosts(userId: string): Promise<any> {
        const result = await this.getConnection()
            .raw(`
                SELECT Posts.id, photo, description, createAt, Posts.userId_labook as AuthorId, UserLabook.name
                FROM UserLabook
                JOIN Posts on UserLabook.id = Posts.userId_labook
                JOIN Friends on Posts.userId_labook = Friends.friendId
                WHERE userId = "${userId}"
                ORDER BY Posts.createAt DESC;
            `)
            
            return result[0]
    }

    public async getPostsType(type: string): Promise<any> {
        const result = await this.getConnection()
            .raw(`
                SELECT * FROM ${UserDatabase.TABLE_POSTS}
                JOIN UserLabook on Posts.userId_labook = UserLabook.id
                WHERE type LIKE "${type}"
                ORDER BY createAt DESC;
            `)

            return result[0]
    }
    
}
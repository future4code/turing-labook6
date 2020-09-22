import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_USERS: string = "UserLabook";

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
    
}
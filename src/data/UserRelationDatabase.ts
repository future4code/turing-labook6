import { BaseDatabase } from "./BaseDatabase";

export class UserRelationDatabase extends BaseDatabase {
    private static TABLE_RELATIONS: string = "Friends";

    public async creatFriendship(
        userId: string,
        friendId: string
        ): Promise<void> {
            await this.getConnection()
                .insert([
                    {
                        userId,
                        friendId
                    },
                    {
                        userId: friendId,
                        friendId: userId
                    }
                ])
                .into(UserRelationDatabase.TABLE_RELATIONS);
        }

    
}
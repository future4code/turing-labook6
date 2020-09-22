import { UserRelationBusiness } from "../business/UserRelationBusiness";
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
        };

    public async brokenFriendship(
        userId: string,
        friendId: string
    ): Promise<void> {
            await this.getConnection()
                .delete()
                .from(UserRelationDatabase.TABLE_RELATIONS)
                .where({
                    userId,
                    friendId
                })
                .or.where({
                    userId: friendId,
                    friendId: userId
                });
    }

    
}
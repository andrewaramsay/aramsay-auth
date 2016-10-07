import { NodeCallback, VoidNodeCallback, DatabaseExecutor } from 'aramsay-framework';
import { ObjectID } from 'mongodb';
import { User } from '../../business/models/user';
import { UserMapper } from '../../mapping/data';
export declare class UsersRepository {
    private database;
    private userMapper;
    constructor(database: DatabaseExecutor, userMapper: UserMapper);
    findUserByUsername(username: string, callback: NodeCallback<User>): void;
    saveUser(user: User, callback: VoidNodeCallback): void;
    findUserById(userId: ObjectID, callback: NodeCallback<User>): void;
}

import { Injectable } from 'aramsay-injector';
import { NodeCallback, VoidNodeCallback, DatabaseExecutor } from 'aramsay-framework';

import { UserModel } from '../models/user';
import { User } from '../../business/models/user';
import { FindUserByUsername } from '../queries/find-user-by-username';
import { FindUserById } from '../queries/find-user-by-id';
import { SaveUser } from '../queries/save-user';
import { UserMapper } from '../../mapping/data';

@Injectable()
export class UsersRepository {
    constructor(
        private database: DatabaseExecutor,
        private userMapper: UserMapper) {
    }
    
    findUserByUsername(username: string, callback: NodeCallback<User>): void {
        this.database.findOne(new FindUserByUsername(username), this.userMapper.mapCallback(callback));
    }

    saveUser(user: User, callback: VoidNodeCallback): void {
        this.userMapper.fromBusinessModel(user, (err, dbUser) => {
            if (err) {
                return callback(err);
            }
            this.database.saveData(new SaveUser(dbUser), callback);
        });
    }

    findUserById(userId: string, callback: NodeCallback<User>): void {
        this.database.findById(new FindUserById(userId), this.userMapper.mapCallback(callback));
    }
}
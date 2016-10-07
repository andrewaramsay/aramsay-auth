import { Injectable } from 'aramsay-injector';
import { NodeCallback, VoidNodeCallback, DatabaseExecutor } from 'aramsay-framework';
import { ObjectID } from 'mongodb';

import { User } from '../../business/models/user';
import { FindUserByUsername } from '../queries/find-user-by-username';
import { FindUserById } from '../queries/find-user-by-id';
import { SaveUser } from '../queries/save-user';
import { UserMapper } from '../../mapping/data';

@Injectable({ singleton: true })
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
            this.database.update(new SaveUser(dbUser), callback);
        });
    }

    findUserById(userId: ObjectID, callback: NodeCallback<User>): void {
        this.database.findOne(new FindUserById(userId), this.userMapper.mapCallback(callback));
    }

    // TODO: Somewhere I want to pull in roles and permissions for a user
}
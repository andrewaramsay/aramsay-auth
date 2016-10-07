import { DbFind, MongoRecord, NodeCallback } from 'aramsay-framework';

import { User } from '../models/user';

export class FindUserBase implements DbFind<User> {
    get collection() {
        return 'users';
    }

    mapResults(record: MongoRecord, callback: NodeCallback<User>) {
        callback(null, {
            _id: record['_id'],
            displayName: record['displayName'],
            loginAttempts: record['loginAttempts'],
            password: record['password'],
            roles: record['roles'],
            username: record['username']
        });
    }
}

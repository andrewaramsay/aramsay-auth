import { TypeMapper, NodeCallback } from 'aramsay-framework';
import { Injectable, InstanceMode } from 'aramsay-injector';

import { User } from '../../business/models/user';
import { User as DbUser } from '../../data/models/user';

@Injectable({ instanceMode: InstanceMode.SingleInstance })
export class UserMapper extends TypeMapper<User, DbUser> {
    toBusinessModel(source: DbUser, callback: NodeCallback<User>): void {
        let destination = <User>{};

        destination.loginAttempts = source.loginAttempts;
        destination.passwordHash = source.password;
        
        callback(null, destination);
    }

    fromBusinessModel(source: User, callback: NodeCallback<DbUser>): void {
        let destination = <DbUser>{};

        destination.loginAttempts = source.loginAttempts;
        destination.password = source.passwordHash;
        
        callback(null, destination);
    }
}
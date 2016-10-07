import { TypeMapper, NodeCallback } from 'aramsay-framework';
import { User } from '../../business/models/user';
import { User as DbUser } from '../../data/models/user';
export declare class UserMapper extends TypeMapper<User, DbUser> {
    toBusinessModel(source: DbUser, callback: NodeCallback<User>): void;
    fromBusinessModel(source: User, callback: NodeCallback<DbUser>): void;
}

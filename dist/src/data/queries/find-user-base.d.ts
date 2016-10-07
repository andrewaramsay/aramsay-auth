import { DbFind, MongoRecord, NodeCallback } from 'aramsay-framework';
import { User } from '../models/user';
export declare class FindUserBase implements DbFind<User> {
    readonly collection: string;
    mapResults(record: MongoRecord, callback: NodeCallback<User>): void;
}

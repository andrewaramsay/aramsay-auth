import { ObjectID } from 'mongodb';
import { FindUserBase } from './find-user-base';
export declare class FindUserById extends FindUserBase {
    private userId;
    constructor(userId: ObjectID);
    readonly filter: {
        _id: ObjectID;
    };
}

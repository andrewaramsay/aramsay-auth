import { ObjectID } from 'mongodb';

import { FindUserBase } from './find-user-base';

export class FindUserById extends FindUserBase {
    constructor(private userId: ObjectID) {
        super();
    }

    get filter() {
        return { 
            _id: this.userId 
        };
    }
}

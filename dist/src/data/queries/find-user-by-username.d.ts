import { FindUserBase } from './find-user-base';
export declare class FindUserByUsername extends FindUserBase {
    private username;
    constructor(username: string);
    readonly filter: {
        username: string;
    };
}

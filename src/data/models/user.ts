import { ObjectID } from 'mongodb';

export interface User  {
    _id: ObjectID;
    username: string;
    displayName: string;
    password: string;
    loginAttempts: number;
    roles: string[];
}

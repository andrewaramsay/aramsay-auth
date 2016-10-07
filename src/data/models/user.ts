// Ensure roles are loaded in since they are referenced by Users
import { ObjectID } from 'mongodb';
import { Role } from './role';

export interface User  {
    _id: ObjectID;
    username: string;
    displayName: string;
    password: string;
    loginAttempts: number;
    roles: string[];
}

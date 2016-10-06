// Ensure roles are loaded in since they are referenced by Users
import { Role, Permission } from './role';

import * as _ from 'lodash';
import { Schema, model, Document, Model, Types } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

export interface User extends Document {
    username: string;
    displayName: string;
    password: string;
    loginAttempts: number;
    roles: Role[];
}

let UserSchema = new Schema({
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    loginAttempts: { type: Number, default: 0 },
    roles: [{ type: ObjectId, ref: 'Role' }]
});

UserSchema.virtual('permissions').get(getPermissions);

/**
 * @this UserModel
 * @returns {Object[]} List of all permissions
 * */
function getPermissions() {
    return _(this.roles)
        .map((role: Role) => role.permissions)
        .flatten()
        .uniqBy((permission: Permission) => permission.name)
        .value();
}

export const UserModel = model<User>('User', UserSchema);

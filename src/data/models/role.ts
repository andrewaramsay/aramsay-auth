import { Schema, model, Types, Document, Model } from 'mongoose';


export interface Permission {
    name: string;
    allow: boolean;
}

export interface Role extends Document {
    id: string
    displayName: string;
    description: string;
    securityOverride: boolean;
    permissions: Permission[];
}

let RoleSchema = new Schema({
    _id: { type: String },
    displayName: { type: String },
    description: { type: String },
    securityOverride: { type: Boolean },
    permissions: [{
        name: { type: String },
        allow: { type: Boolean }
    }]
});


export const RoleModel = model<Role>('Role', RoleSchema);

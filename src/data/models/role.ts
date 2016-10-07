export interface Role {
    id: string
    displayName: string;
    description: string;
    securityOverride: boolean;
    permissions: Permission[];
}

export interface Permission {
    name: string;
    allow: boolean;
}

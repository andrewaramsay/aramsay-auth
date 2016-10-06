

export interface AuthCallback<T> {
    (err: Error, result?: T, authError?: any): void;
}

export interface TokenPayload {
    iss: any;
    sub: any;
    exp: number;
}

export interface Token {
    token: string,
    exp: number;
}

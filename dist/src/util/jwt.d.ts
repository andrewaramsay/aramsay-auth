export interface Jwt {
    encode(payload: any, key: string, algorithm?: string, options?: any): string;
    decode(token: any, key: string, noVerify?: boolean, algorithm?: string): any;
}

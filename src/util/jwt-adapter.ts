import { Injectable } from 'aramsay-injector';
import { decode, encode } from 'jwt-simple';

@Injectable()
export class JwtAdapter {
    encode(payload: any, key: string, algorithm?: string, options?: any): string {
        return encode(payload, key, algorithm, options);
    }

    decode(token: any, key: string, noVerify?: boolean, algorithm?: string): any {
        return decode(token, key, noVerify, algorithm);
    }
}
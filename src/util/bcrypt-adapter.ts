import { NodeCallback } from 'aramsay-framework';
import { Injectable } from 'aramsay-injector';
import { compare } from 'bcrypt-nodejs';

@Injectable()
export class BcryptAdapter  {
    compare(data: string, hash: string, callback: NodeCallback<boolean>): void {
        return compare(data, hash, callback);
    }
}